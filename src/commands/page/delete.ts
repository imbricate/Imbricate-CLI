/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Delete
 */

import { IImbricateOrigin, IImbricateOriginCollection, ImbricatePageSnapshot } from "@imbricate/core";
import { checkSavingTargetActive, cleanupImbricateSavingTarget } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { SAVING_TARGET_TYPE, SavingTarget } from "../../editing/definition";
import { createPageSavingTarget } from "../../editing/saving-target/create-saving.target";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIPageEditing } from "../../error/page/page-editing";
import { CLIPageInvalidInput } from "../../error/page/page-invalid-input";
import { CLIPageNotFound } from "../../error/page/page-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { inputParseDirectories } from "../../util/input-parse";

type PageDeleteCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly quiet?: boolean;
    readonly force?: boolean;

    readonly title?: string;
    readonly identifier?: string;
};

const performPageDelete = async (
    collection: IImbricateOriginCollection,
    page: ImbricatePageSnapshot,
    options: PageDeleteCommandOptions,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
): Promise<void> => {

    const originName: string | null = globalManager.activeOrigin;

    if (!originName) {
        throw CLIActiveOriginNotFound.create();
    }

    const savingTarget: SavingTarget<SAVING_TARGET_TYPE.PAGE> = createPageSavingTarget(
        globalManager,
        collection.collectionName,
        collection.uniqueIdentifier,
        page.identifier,
    );

    const isActive: boolean = await checkSavingTargetActive(savingTarget);

    if (isActive) {

        if (!options.force) {

            if (!options.quiet) {

                terminalController.printInfo(`Page [${page.identifier}] -> "${page.title}" is currently being edited`);
                terminalController.printInfo("Consider use --force to delete it anyway, or resolve the editing first");
            }

            throw CLIPageEditing.withIdentifier(page.identifier);
        }

        if (!options.quiet) {

            terminalController.printInfo(`Page [${page.identifier}] -> "${page.title}" is currently being edited, resolving the editing...`);
        }

        await cleanupImbricateSavingTarget(savingTarget);

        if (!options.quiet) {

            terminalController.printInfo(`Editing for page [${page.identifier}] -> "${page.title}" resolved`);
        }
    }

    await collection.deletePage(page.identifier);

    if (!options.quiet) {
        terminalController.printInfo(`Page [${page.identifier}] -> "${page.title}" deleted`);
    }
};

export const createPageDeleteCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const deleteCommand: Command = createConfiguredCommand("delete");
    deleteCommand.alias("rm");

    deleteCommand
        .description("delete a existing page in the collection")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option(
            "-d, --directories <directories>",
            "page directories, nested with slash (/)",
            inputParseDirectories,
        )
        .option(
            "-t, --title <page-title>",
            "delete page by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "delete page by page identifier or pointer (one-of)",
        )
        .option("-q, --quiet", "quite mode")
        .option("-f, --force", "force mode")
        .action(createActionRunner(terminalController, async (
            options: PageDeleteCommandOptions,
        ): Promise<void> => {

            if (!options.title && !options.identifier) {
                throw CLIPageInvalidInput.withMessage("One of --title or --identifier is required");
            }

            if (typeof options.directories === "undefined" && !options.quiet) {
                terminalController.printInfo("No directories specified, using root directory");
            }

            const directories: string[] = options.directories ?? [];
            const collectionName: string = options.collection;

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const hasCollection: boolean = await currentOrigin.hasCollection(collectionName);

            if (!hasCollection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const collection: IImbricateOriginCollection | null
                = await currentOrigin.getCollection(collectionName);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const pages: ImbricatePageSnapshot[] =
                await collection.listPages(directories, false);

            if (typeof options.title === "string" && options.title.length > 0) {

                const page: ImbricatePageSnapshot | undefined = pages.find((
                    each: ImbricatePageSnapshot,
                ) => {
                    return each.title === options.title;
                });

                if (!page) {
                    throw CLIPageNotFound.withPageTitle(options.title);
                }

                await performPageDelete(
                    collection,
                    page,
                    options,
                    globalManager,
                    terminalController,
                );

                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const page of pages) {

                    if (page.identifier.startsWith(options.identifier)) {

                        await performPageDelete(
                            collection,
                            page,
                            options,
                            globalManager,
                            terminalController,
                        );

                        return;
                    }
                }

                throw CLIPageNotFound.withPageIdentifier(options.identifier);
            }
        }));

    return deleteCommand;
};
