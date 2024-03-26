/**
 * @author WMXPY
 * @description CLI
 */

import { Command } from "commander";
import { createCollectionCommand } from "./cli/commands/collection";
import { createOriginCommand } from "./cli/commands/origin";
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

imbricateProgram.addCommand(createCollectionCommand(globalManager));
imbricateProgram.addCommand(createOriginCommand(globalManager));

export const execute = async (): Promise<void> => {
    imbricateProgram.parse(process.argv);
};
