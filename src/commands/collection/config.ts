/**
 * @author WMXPY
 * @namespace Commands_Collection
 * @description Config
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createCollectionConfigSetCommand } from "./config/set";
import { createCollectionConfigShowCommand } from "./config/show";

export const createCollectionConfigCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const configCommand: Command = createConfiguredCommand("config");

    configCommand
        .description("manage config of collections");

    configCommand.addCommand(createCollectionConfigSetCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    configCommand.addCommand(createCollectionConfigShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return configCommand;
};
