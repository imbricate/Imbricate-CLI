/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description Config
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createOriginConfigGetCommand } from "./config/get";
import { createOriginConfigSetCommand } from "./config/set";
import { createOriginConfigShowCommand } from "./config/show";

export const createOriginConfigCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const configCommand: Command = createConfiguredCommand("config");

    configCommand
        .description("manage config of origins");

    configCommand.addCommand(createOriginConfigGetCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createOriginConfigSetCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createOriginConfigShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return configCommand;
};
