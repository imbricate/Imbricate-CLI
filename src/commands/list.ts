/**
 * @author WMXPY
 * @namespace Commands
 * @description List
 */

import { Command } from "commander";
import { CommandCommonOptions } from "../definition/options";
import { getDirectory } from "../util/get-directory";

type ListCommandOptions = {

    // PLACEHOLDER
} & CommandCommonOptions;

export const listCommand = new Command("list");
listCommand
    .description("List all the APIs")
    .action(async (options: ListCommandOptions): Promise<void> => {

        const directory: string = getDirectory(options);

        console.log("List", directory);
    });
