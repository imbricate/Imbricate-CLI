/**
 * @author WMXPY
 * @namespace CLI_Commands_Collection
 * @description List
 */

import { Command } from "commander";
import { IImbricateOriginCollection } from "../../../origin/collection/interface";
import { IImbricateOrigin } from "../../../origin/interface";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type CollectionListCommandOptions = {

    readonly quiet?: boolean;
};

export const createCollectionListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("list");

    createCommand
        .description("list collections")
        .action(createActionRunner(terminalController, async (
            collectionName: string,
            options: CollectionListCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collections: IImbricateOriginCollection[] = await currentOrigin.listCollections();

            console.log(collections);

            console.log("Collection Create", collectionName, options, globalManager.workingDirectory);

            configurationManager.origins;
        }));

    return createCommand;
};
