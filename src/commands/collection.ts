/**
 * @author WMXPY
 * @namespace Commands
 * @description Collection
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createCollectionCreateCommand } from "./collection/create";
import { createCollectionListCommand } from "./collection/list";
import { createCollectionConfigCommand } from "./collection/config";
import { createCollectionDeleteCommand } from "./collection/delete";

export const createCollectionCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const collectionCommand: Command = createConfiguredCommand("collection");

    collectionCommand
        .description("create, read, update and delete collections");

    collectionCommand.addCommand(createCollectionConfigCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    collectionCommand.addCommand(createCollectionCreateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    collectionCommand.addCommand(createCollectionDeleteCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    collectionCommand.addCommand(createCollectionListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return collectionCommand;
};
