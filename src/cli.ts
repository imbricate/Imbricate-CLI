/**
 * @author WMXPY
 * @description CLI
 */

import { Command } from "commander";
import { createCallCommand } from "./cli/commands/call";
import { createListCommand } from "./cli/commands/list";
import { createServeCommand } from "./cli/commands/serve";
import { addDirectoryExtension } from "./cli/extensions/directory";
import { addVerboseConfigurationExtension } from "./cli/extensions/verbose-configuration";
import { GlobalManager } from "./util/global-manager";

const globalManager = GlobalManager.fromScratch();

const imbricateProgram = new Command();

imbricateProgram
    .version("<current-version>")
    .name("imbricate")
    .description("Imbricate CLI");

addDirectoryExtension(imbricateProgram, globalManager);
addVerboseConfigurationExtension(imbricateProgram, globalManager);

imbricateProgram.addCommand(createCallCommand(globalManager));
imbricateProgram.addCommand(createListCommand(globalManager));
imbricateProgram.addCommand(createServeCommand(globalManager));

export const execute = async (): Promise<void> => {
    imbricateProgram.parse(process.argv);
};
