/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Open
 */

import { IImbricateOrigin, IImbricateOriginCollection, ImbricatePageSnapshot } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { SAVING_TARGET_TYPE, SavingTarget } from "../../editing/definition";
import { openContentAndMonitor } from "../../editing/open-file";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIPageInvalidInput } from "../../error/page/page-invalid-input";
import { CLIPageNotFound } from "../../error/page/page-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type PageOpenCommandOptions = {

    readonly collection: string;

    readonly title?: string;
    readonly identifier?: string;
};

export const createPageOpenCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const openCommand: Command = createConfiguredCommand("open");

    openCommand
        .description("open a page in the collection")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option(
            "-t, --title <page-title>",
            "open page by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "open page by page identifier or pointer (one-of)",
        )
        .option("-h, --hands-free", "open the page without monitoring the file changes")
        .action(createActionRunner(terminalController, async (
            options: PageOpenCommandOptions,
        ): Promise<void> => {

            console.log(options);

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

                const pageContent: string = await page.readContent();
                const target: SavingTarget<SAVING_TARGET_TYPE.PAGE> = {

                    type: SAVING_TARGET_TYPE.PAGE,
                    payload: {
                        origin: globalManager.activeOrigin!,
                        collection: collection.collectionName,
                        identifier: page.identifier,
                    },
                };

                await openContentAndMonitor(
                    pageContent,
                    `${pageSnapshot.title}.md`,
                    target,
                    globalManager,
                    terminalController,
                    configurationManager,
                );

                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const pageSnapshot of pages) {

                    if (pageSnapshot.identifier.startsWith(options.identifier)) {


                        const page = await collection.getPage(pageSnapshot.identifier);

                        if (!page) {
                            throw CLIPageNotFound.withPageIdentifier(pageSnapshot.identifier);
                        }

                        const pageContent: string = await page.readContent();
                        const target: SavingTarget<SAVING_TARGET_TYPE.PAGE> = {

                            type: SAVING_TARGET_TYPE.PAGE,
                            payload: {
                                origin: globalManager.activeOrigin!,
                                collection: collection.collectionName,
                                identifier: page.identifier,
                            },
                        };

                        await openContentAndMonitor(
                            pageContent,
                            `${pageSnapshot.title}.md`,
                            target,
                            globalManager,
                            terminalController,
                            configurationManager,
                        );

                        return;
                    }
                }

                throw CLIPageNotFound.withPageIdentifier(options.identifier);
            }
        }));

    return openCommand;
};
