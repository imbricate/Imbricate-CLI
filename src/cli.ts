/**
 * @author WMXPY
 * @description CLI
 */

import { Command } from "commander";
import { listCommand } from "./commands/list";

const imbricateProgram = new Command();

imbricateProgram
    .version("<current-version>")
    .name("imbricate")
    .description("Imbricate CLI");

imbricateProgram.addCommand(listCommand);

export const execute = (): void => {
    imbricateProgram.parse(process.argv);
};
