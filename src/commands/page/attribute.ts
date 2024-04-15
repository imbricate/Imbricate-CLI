/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Attribute
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createPageAttributeSetCommand } from "./attribute/set";

export const createPageAttributeCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const attributeCommand: Command = createConfiguredCommand("attribute");

    attributeCommand
        .description("manage attributes of a page")
        .alias("attr");

    attributeCommand.addCommand(createPageAttributeSetCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return attributeCommand;
};
