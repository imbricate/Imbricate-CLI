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
import { createScriptAttributeSetCommand } from "./attribute/set";

export const createScriptAttributeCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const attributeCommand: Command = createConfiguredCommand("attribute");

    attributeCommand
        .description("manage attributes of a script")
        .alias("attr");

    attributeCommand.addCommand(createScriptAttributeSetCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return attributeCommand;
};
