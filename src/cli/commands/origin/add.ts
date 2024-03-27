/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description Add
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createOriginAddFileSystemCommand } from "./add/file-system";

export const createOriginAddCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const addCommand: Command = createConfiguredCommand("add");

    addCommand
        .description("add new origin managements");

    addCommand.addCommand(createOriginAddFileSystemCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return addCommand;
};
