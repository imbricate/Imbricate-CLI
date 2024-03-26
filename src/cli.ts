/**
 * @author WMXPY
 * @description CLI
 */

import { Command } from "commander";
import { createCollectionCommand } from "./cli/commands/collection";
import { createOriginCommand } from "./cli/commands/origin";
import { addDirectoryExtension } from "./cli/extensions/directory";
import { addInitializeOriginExtension } from "./cli/extensions/initialize-origin";
import { addVerboseConfigurationExtension } from "./cli/extensions/verbose-configuration";
import { addWorkingDirectoryOriginExtension } from "./cli/extensions/working-directory-origin";
import { GlobalManager } from "./util/global-manager";

const globalManager = GlobalManager.fromScratch();

const imbricateProgram = new Command();

imbricateProgram
    .version("<current-version>")
    .name("imbricate")
    .description("Imbricate CLI");

imbricateProgram
    .configureHelp({
        showGlobalOptions: true,
    });

addDirectoryExtension(imbricateProgram, globalManager);
addVerboseConfigurationExtension(imbricateProgram, globalManager);

addInitializeOriginExtension(imbricateProgram, globalManager);
addWorkingDirectoryOriginExtension(imbricateProgram, globalManager);

imbricateProgram.addCommand(createCollectionCommand(globalManager));
imbricateProgram.addCommand(createOriginCommand(globalManager));

export const execute = async (): Promise<void> => {
    imbricateProgram.parse(process.argv);
};
