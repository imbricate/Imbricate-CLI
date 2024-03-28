/**
 * @author WMXPY
 * @namespace CLI_Commands
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

export const createScriptCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const scriptCommand: Command = createConfiguredCommand("script");

    scriptCommand
        .description("manage imbricate pages");

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

    return scriptCommand;
};
