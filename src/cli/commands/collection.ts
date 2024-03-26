/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Collection
 */

import { Command } from "commander";
import { GlobalManager } from "../../util/global-manager";
import { createCollectionCreateCommand } from "./collection/create";

export const createCollectionCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("collection");
    callCommand
        .description("Collections Management")
        .alias("cl")
        .addCommand(createCollectionCreateCommand(globalManager));

    return callCommand;
};
