/**
 * @author WMXPY
 * @namespace Commands
 * @description Serve
 */

import { Command } from "commander";
import { CommandCommonOptions } from "../definition/options";
import { getDirectory } from "../util/get-directory";

type ServeCommandOptions = {

    // PLACEHOLDER
} & CommandCommonOptions;

export const serveCommand = new Command("serve");
serveCommand
    .description("Start up the server")
    .action(async (options: ServeCommandOptions): Promise<void> => {

        const directory: string = getDirectory(options);

        console.log("Serve", directory);
    });
