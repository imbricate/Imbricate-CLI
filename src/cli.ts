/**
 * @author WMXPY
 * @description CLI
 */

import { Command } from "commander";

const imbricateProgram = new Command();

imbricateProgram
    .version("<current-version>")
    .name("imbricate")
    .description("Imbricate CLI");

const listCommand = imbricateProgram.command("list");
listCommand
    .description("List all the APIs")
    .action(() => {
        console.log("List");
    });

export const execute = (): void => {
    imbricateProgram.parse(process.argv);
};
