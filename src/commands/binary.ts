/**
 * @author WMXPY
 * @namespace Commands
 * @description Binary
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createBinaryPutCommand } from "./binary/put";

export const createBinaryCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const binaryCommand: Command = createConfiguredCommand("binary");

    binaryCommand
        .description("imbricate binary storage management");

    binaryCommand.addCommand(createBinaryPutCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return binaryCommand;
};
