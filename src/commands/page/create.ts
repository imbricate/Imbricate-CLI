/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Create
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { SAVING_TARGET_TYPE, SavingTarget } from "../../editing/definition";
import { openContentAndMonitor } from "../../editing/open-file";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIPageAlreadyExists } from "../../error/page/page-already-exists";
import { CLIPageNotFound } from "../../error/page/page-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { createPageSavingTarget } from "../../editing/saving-target/create-saving.target";

type PageCreateCommandOptions = {

    readonly collection: string;

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
        .option("-q, --quiet", "quite mode")
        .option("-no, --no-open", "do not open the page after creation")
        .option("-h, --hands-free", "open the created page without monitoring the file changes")
        .argument("<page-title>", "title of the page")
        .action(createActionRunner(terminalController, async (
            pageTitle: string,
            options: PageCreateCommandOptions,
        ): Promise<void> => {

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

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
                options.quiet,
            );

            const pageExists: boolean = await collection.hasPage([], pageTitle); // TODO

            if (pageExists) {
                throw CLIPageAlreadyExists.withPageName(pageTitle);
            }

            const item = await collection.createPage([], pageTitle); // TODO

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
