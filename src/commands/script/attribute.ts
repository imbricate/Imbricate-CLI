/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Attribute
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";

export const createScriptAttributeCommand = (
    _globalManager: GlobalManager,
    _terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const attributeCommand: Command = createConfiguredCommand("attribute");

    attributeCommand
        .description("manage attributes of a script")
        .alias("attr");

    return attributeCommand;
};
