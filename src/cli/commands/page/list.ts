/**
 * @author WMXPY
 * @namespace CLI_Commands_Page
 * @description List
 */

import { Command } from "commander";
import { IImbricateOriginCollection, ImbricateOriginCollectionListPagesResponse } from "../../../origin/collection/interface";
import { IImbricateOrigin } from "../../../origin/interface";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type PageListCommandOptions = {

    readonly collection: string;
};

export const createPageListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("list");

    createCommand
        .description("list available pages")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .action(createActionRunner(terminalController, async (
            options: PageListCommandOptions,
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

            const pages: ImbricateOriginCollectionListPagesResponse[] = await collection.listPages();

            console.log(pages);
        }));

    return createCommand;
};
