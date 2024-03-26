/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Origin
 */

import { Command } from "commander";
import { ConfigurationManager } from "../configuration/configuration-manager";
import { GlobalManager } from "../global/global-manager";
import { createConfiguredCommand } from "../util/command";
import { createOriginAddCommand } from "./origin/add";
import { createOriginListCommand } from "./origin/list";
import { createOriginUseCommand } from "./origin/use";

export const createOriginCommand = (
    globalManager: GlobalManager,
    configurationManager: ConfigurationManager,
): Command => {

    const originCommand: Command = createConfiguredCommand("origin");

    originCommand
        .description("manage imbricate origins");

    originCommand.addCommand(createOriginAddCommand(globalManager, configurationManager));
    originCommand.addCommand(createOriginListCommand(globalManager));
    originCommand.addCommand(createOriginUseCommand(globalManager));

    return originCommand;
};
