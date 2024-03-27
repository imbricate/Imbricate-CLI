/**
 * @author WMXPY
 * @namespace CLI_Commands_Collection
 * @description Config
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createCollectionConfigShowCommand } from "./config/show";

export const createCollectionConfigCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("config");

    createCommand
        .description("manage config of target collection");

    createCommand.addCommand(createCollectionConfigShowCommand(
        globalManager,
        terminalController,
        _configurationManager,
    ));

    return createCommand;
};
