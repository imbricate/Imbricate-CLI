/**
 * @author WMXPY
 * @namespace Commands
 * @description Config
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createConfigEditorCommand } from "./config/editor";
import { createConfigGetCommand } from "./config/get";
import { createConfigOpenCommand } from "./config/open";
import { createConfigProfileCommand } from "./config/profile";
import { createConfigSetCommand } from "./config/set";
import { createConfigShowCommand } from "./config/show";

export const createConfigCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const configCommand: Command = createConfiguredCommand("config");

    configCommand
        .description("get, set, and manage imbricate configurations");

    configCommand.addCommand(createConfigEditorCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createConfigGetCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createConfigOpenCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createConfigProfileCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createConfigSetCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createConfigShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return configCommand;
};
