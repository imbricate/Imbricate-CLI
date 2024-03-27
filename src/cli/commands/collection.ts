/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Collection
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { createConfiguredCommand } from "../util/command";
import { createCollectionCreateCommand } from "./collection/create";
import { ITerminalController } from "../terminal/definition";

export const createCollectionCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const collectionCommand: Command = createConfiguredCommand("collection");

    collectionCommand
        .description("create, read, update and delete collections")
        .alias("cl");

    collectionCommand.addCommand(createCollectionCreateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return collectionCommand;
};
