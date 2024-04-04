/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Show
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage, ImbricatePageSnapshot } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIPageInvalidInput } from "../../error/page/page-invalid-input";
import { CLIPageNotFound } from "../../error/page/page-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type PageShowCommandOptions = {

    readonly collection: string;

    readonly json?: boolean;

    readonly title?: string;
    readonly identifier?: string;
};

const getPage = async (
    options: PageShowCommandOptions,
    globalManager: GlobalManager,
): Promise<IImbricatePage> => {

    if (!options.title && !options.identifier) {
        throw CLIPageInvalidInput.withMessage("One of --title or --identifier is required");
    }

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
        await collection.listPages();

    if (typeof options.title === "string" && options.title.length > 0) {

        const pageSnapshot: ImbricatePageSnapshot | undefined = pages.find((
            each: ImbricatePageSnapshot,
        ) => {
            return each.title === options.title;
        });

        if (!pageSnapshot) {
            throw CLIPageNotFound.withPageTitle(options.title);
        }

        const page = await collection.getPage(pageSnapshot.identifier);

        if (!page) {
            throw CLIPageNotFound.withPageIdentifier(pageSnapshot.identifier);
        }

        return page;
    }

    if (typeof options.identifier === "string" && options.identifier.length > 0) {

        for (const pageSnapshot of pages) {

            if (pageSnapshot.identifier.startsWith(options.identifier)) {


                const page = await collection.getPage(pageSnapshot.identifier);

                if (!page) {
                    throw CLIPageNotFound.withPageIdentifier(pageSnapshot.identifier);
                }

                return page;
            }
        }
    }

    throw CLIPageNotFound.withUnknownIssue();
};

export const createPageShowCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show details of a page in a collection")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option("-j, --json", "print result as JSON")
        .option(
            "-t, --title <page-title>",
            "open page by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "open page by page identifier or pointer (one-of)",
        )
        .action(createActionRunner(terminalController, async (
            options: PageShowCommandOptions,
        ): Promise<void> => {

            const page: IImbricatePage = await getPage(options, globalManager);

            if (options.json) {

                terminalController.printInfo(JSON.stringify({
                    title: page.title,
                    identifier: page.identifier,
                    createdAt: page.createdAt.toISOString(),
                    updatedAt: page.updatedAt.toISOString(),
                }, null, 2));
                return;
            }

            const textOutput: string = [
                `Title: ${page.title}`,
                `Identifier: ${page.identifier}`,
                `Created At: ${page.createdAt.toLocaleString()}`,
                `Updated At: ${page.updatedAt.toLocaleString()}`,
            ].join("\n");

            terminalController.printInfo(textOutput);
        }));

    return showCommand;
};
