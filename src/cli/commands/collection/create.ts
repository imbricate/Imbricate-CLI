/**
 * @author WMXPY
 * @namespace CLI_Commands_Collection
 * @description Create
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type CollectionCreateCommandOptions = {

    readonly quiet?: boolean;
};

export const createCollectionCreateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new collection")
        .option("-q, --quiet", "quite mode")
        .argument("<collection-name>", "Name of the collection")
        .action(createActionRunner(terminalController, async (
            collectionName: string,
            options: CollectionCreateCommandOptions,
        ): Promise<void> => {

            console.log("Collection Create", collectionName, options, globalManager.workingDirectory);

            configurationManager.origins;
        }));

    return createCommand;
};
