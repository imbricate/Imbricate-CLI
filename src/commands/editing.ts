/**
 * @author WMXPY
 * @namespace Commands
 * @description Editing
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createEditingListCommand } from "./editing/list";

export const createEditingCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const editingCommand: Command = createConfiguredCommand("editing");

    editingCommand
        .description("manage editing imbricate pages and scripts");

    editingCommand.addCommand(createEditingListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return editingCommand;
};
