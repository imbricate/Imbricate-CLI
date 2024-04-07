/**
 * @author WMXPY
 * @namespace Commands
 * @description Script
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
import { createScriptRenameCommand } from "./script/rename";
import { createScriptRunCommand } from "./script/run";
import { createScriptShowCommand } from "./script/show";

export const createScriptCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const scriptCommand: Command = createConfiguredCommand("script");

    scriptCommand
        .description("manage imbricate scripts");

    scriptCommand.addCommand(createScriptCreateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    scriptCommand.addCommand(createScriptDeleteCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    scriptCommand.addCommand(createScriptListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    scriptCommand.addCommand(createScriptOpenCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    scriptCommand.addCommand(createScriptRenameCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    scriptCommand.addCommand(createScriptRunCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    scriptCommand.addCommand(createScriptShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return scriptCommand;
};
