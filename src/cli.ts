/**
 * @author WMXPY
 * @description CLI
 */

import { Command } from "commander";
import { callCommand } from "./commands/call";
import { listCommand } from "./commands/list";
import { serveCommand } from "./commands/serve";
import { addVerboseConfigurationOption } from "./extensions/verbose-configuration";

const imbricateProgram = new Command();

imbricateProgram
    .version("<current-version>")
    .option("-d, --directory <path>", "specify working directory")
    .name("imbricate")
    .description("Imbricate CLI");

addVerboseConfigurationOption(imbricateProgram);

imbricateProgram.addCommand(callCommand);
imbricateProgram.addCommand(listCommand);
imbricateProgram.addCommand(serveCommand);

export const execute = (): void => {
    imbricateProgram.parse(process.argv);
};
