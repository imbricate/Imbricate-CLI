/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description History
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createPageHistoryShowCommand } from "./history/show";

export const createPageHistoryCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const historyCommand: Command = createConfiguredCommand("history");

    historyCommand
        .description("manage histories of a page");

    historyCommand.addCommand(createPageHistoryShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return historyCommand;
};
