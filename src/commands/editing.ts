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
import { createScriptCreateCommand } from "./script/create";
import { createScriptDeleteCommand } from "./script/delete";
import { createScriptListCommand } from "./script/list";
import { createScriptOpenCommand } from "./script/open";
import { createScriptRunCommand } from "./script/run";

export const createEditingCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const editingCommand: Command = createConfiguredCommand("editing");

    editingCommand
        .description("manage editing imbricate pages and scripts");

    editingCommand.addCommand(createScriptCreateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createScriptDeleteCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createScriptListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createScriptOpenCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createScriptRunCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return editingCommand;
};
