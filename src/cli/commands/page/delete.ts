/**
 * @author WMXPY
 * @namespace CLI_Commands_Page
 * @description Delete
 */

import { Command } from "commander";
import { IImbricateOriginCollection, ImbricateOriginCollectionListPagesResponse } from "../../../origin/collection/interface";
import { IImbricateOrigin } from "../../../origin/interface";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIPageInvalidInput } from "../../error/page/page-invalid-input";
import { CLIPageNotFound } from "../../error/page/page-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type PageDeleteCommandOptions = {

    readonly collection: string;

    readonly quiet?: boolean;

    readonly title?: string;
    readonly identifier?: string;
};

export const createPageDeleteCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const deleteCommand: Command = createConfiguredCommand("delete");

    deleteCommand
        .description("delete a existing page in the collection")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
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
        .action(createActionRunner(terminalController, async (
            options: PageDeleteCommandOptions,
        ): Promise<void> => {

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

            const pages: ImbricateOriginCollectionListPagesResponse[] =
                await collection.listPages();

            if (typeof options.title === "string" && options.title.length > 0) {

                const page: ImbricateOriginCollectionListPagesResponse | undefined = pages.find((
                    each: ImbricateOriginCollectionListPagesResponse,
                ) => {
                    return each.title === options.title;
                });

                if (!page) {
                    throw CLIPageNotFound.withPageTitle(options.title);
                }

                await collection.deletePage(page.identifier, page.title);

                if (!options.quiet) {

                    terminalController.printInfo(`Page [${page.identifier}] -> "${page.title}" deleted`);
                }

                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const page of pages) {

                    if (page.identifier.startsWith(options.identifier)) {

                        await collection.deletePage(page.identifier, page.title);

                        if (!options.quiet) {
                            terminalController.printInfo(`Page [${page.identifier}] -> "${page.title}" deleted`);
                        }

                        return;
                    }
                }

                throw CLIPageNotFound.withPageIdentifier(options.identifier);
            }
        }));

    return deleteCommand;
};
