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
import { createOriginConfigShowCommand } from "./config/show";

export const createOriginConfigCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const addCommand: Command = createConfiguredCommand("config");

    addCommand
        .description("manage config of origins");

    addCommand.addCommand(createOriginConfigShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return addCommand;
};
