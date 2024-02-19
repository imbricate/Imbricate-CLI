/**
 * @author WMXPY
 * @namespace Commands
 * @description Serve
 */

import { Command } from "commander";
import { GlobalManager } from "../util/global-manager";

type ServeCommandOptions = {

    // PLACEHOLDER
};

export const createServeCommand = (
    globalManager: GlobalManager,
): Command => {

    const serveCommand = new Command("serve");
    serveCommand
        .description("Start up the server")
        .action(async (_options: ServeCommandOptions): Promise<void> => {

            console.log("Serve", globalManager.workingDirectory);
        });

    return serveCommand;
};
