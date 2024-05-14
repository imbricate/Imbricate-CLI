/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Create
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage } from "@imbricate/core";
import { SAVING_TARGET_TYPE, SavingTarget, validateFilename } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { openContentAndMonitor } from "../../editing/open-file";
import { createPageSavingTarget } from "../../editing/saving-target/create-saving.target";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIInvalidPageTitle } from "../../error/page/invalid-page-title";
import { CLIPageAlreadyExists } from "../../error/page/page-already-exists";
import { CLIPageNotFound } from "../../error/page/page-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { inputParseDirectories } from "../../util/input-parse";

type PageCreateCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly open?: boolean;
    readonly quiet?: boolean;

    readonly handsFree?: boolean;
};

export const createPageCreateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new page")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option(
            "-d, --directories <directories>",
            "page directories, nested with slash (/)",
            inputParseDirectories,
        )
        .option("-q, --quiet", "quite mode")
        .option("-no, --no-open", "do not open the page after creation")
        .option("-h, --hands-free", "open the created page without monitoring the file changes")
        .argument("<page-title>", "title of the page")
        .action(createActionRunner(terminalController, async (
            pageTitle: string,
            options: PageCreateCommandOptions,
        ): Promise<void> => {

            const directories: string[] = options.directories ?? [];
            const collectionName: string = options.collection;

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const validateResult: string | null = validateFilename(pageTitle);
            if (validateResult !== null) {
                throw CLIInvalidPageTitle.withPageTitle(pageTitle, validateResult);
            }

            const collection: IImbricateCollection | null
                = await currentOrigin.findCollection(collectionName);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
                options.quiet,
            );

            const pageExists: boolean = await collection.hasPage(
                directories,
                pageTitle,
            );

            if (pageExists) {
                throw CLIPageAlreadyExists.withPageNameAndDirectories(pageTitle, directories);
            }

            const item = await collection.createPage(directories, pageTitle, "");

            if (!options.quiet) {
                terminalController.printInfo(`Page "${pageTitle}" created`);
                terminalController.printInfo(`Identifier: ${item.identifier}`);
            }

            if (options.open) {

                if (!options.quiet) {
                    terminalController.printInfo(`Opening page "${pageTitle}"`);
                }

                const page: IImbricatePage | null = await collection.getPage(item.identifier);

                if (!page) {
                    throw CLIPageNotFound.withPageIdentifier(item.identifier);
                }

                const pageContent: string = await page.readContent();
                const target: SavingTarget<SAVING_TARGET_TYPE.PAGE> = createPageSavingTarget(
                    globalManager,
                    collectionName,
                    collection.uniqueIdentifier,
                    page.identifier,
                );

                await openContentAndMonitor(
                    pageContent,
                    `${pageTitle}.md`,
                    target,
                    globalManager,
                    terminalController,
                    profile,
                    options.handsFree ?? false,
                );
            }
        }));

    return createCommand;
};
