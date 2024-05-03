/**
 * @author WMXPY
 * @namespace Commands_Collection_Config
 * @description Set
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createConfiguredCommand } from "../../../util/command";
import { createCollectionConfigSetIncludeInSearchCommand } from "./set/include-in-search";

export const createCollectionConfigSetCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const setCommand: Command = createConfiguredCommand("set");

    setCommand
        .description("manage config of collections");

    setCommand.addCommand(createCollectionConfigSetIncludeInSearchCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return setCommand;
};
