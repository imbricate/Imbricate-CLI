/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Page
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createPageCreateCommand } from "./page/create";
import { createPageListCommand } from "./page/list";
import { createPageOpenCommand } from "./page/open";

export const createPageCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const pageCommand: Command = createConfiguredCommand("page");

    pageCommand
        .description("manage imbricate pages");

    pageCommand.addCommand(createPageCreateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageOpenCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return pageCommand;
};
