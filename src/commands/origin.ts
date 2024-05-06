/**
 * @author WMXPY
 * @namespace Commands
 * @description Origin
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createOriginAddCommand } from "./origin/add";
import { createOriginConfigCommand } from "./origin/config";
import { createOriginDeleteCommand } from "./origin/delete";
import { createOriginListCommand } from "./origin/list";
import { createOriginShowCommand } from "./origin/show";
import { createOriginUseCommand } from "./origin/use";

export const createOriginCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const originCommand: Command = createConfiguredCommand("origin");

    originCommand
        .description("manage imbricate origins");

    originCommand.addCommand(createOriginAddCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    originCommand.addCommand(createOriginConfigCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    originCommand.addCommand(createOriginDeleteCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    originCommand.addCommand(createOriginListCommand(
        globalManager,
        terminalController,
    ));
    originCommand.addCommand(createOriginShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    originCommand.addCommand(createOriginUseCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return originCommand;
};
