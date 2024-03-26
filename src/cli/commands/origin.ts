/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Origin
 */

import { Command } from "commander";
import { GlobalManager } from "../../util/global-manager";
import { createOriginListCommand } from "./origin/list";

export const createOriginCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("origin");
    callCommand
        .description("Origins Management")
        .addCommand(createOriginListCommand(globalManager));

    return callCommand;
};
