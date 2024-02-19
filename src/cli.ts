/**
 * @author WMXPY
 * @description CLI
 */

import { Command } from "commander";
import { createCallCommand } from "./commands/call";
import { createListCommand } from "./commands/list";
import { createServeCommand } from "./commands/serve";
import { addDirectoryExtension } from "./extensions/directory";
import { addVerboseConfigurationExtension } from "./extensions/verbose-configuration";
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

export const execute = (): void => {
    imbricateProgram.parse(process.argv);
};
