/**
 * @author WMXPY
 * @namespace Commands
 * @description List
 */

import { Command } from "commander";
import * as Path from "path";

type ListCommandOptions = {

    readonly directory?: string;
};

export const listCommand = new Command("list");
listCommand
    .description("List all the APIs")
    .option("-d, --directory <path>", "specify the directory to list the APIs")
    .action((options: ListCommandOptions) => {

        const directory: string = typeof options.directory === "string"
            ? Path.resolve(options.directory)
            : process.cwd();

        console.log("List", directory);
    });
