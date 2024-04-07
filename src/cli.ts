/**
 * @author WMXPY
 * @description CLI
 */

import { FileSystemImbricateOrigin, FileSystemOriginPayload } from "@imbricate/origin-file-system";
import { Command } from "commander";
import { createCollectionCommand } from "./commands/collection";
import { createEditingCommand } from "./commands/editing";
import { createOriginCommand } from "./commands/origin";
import { createPageCommand } from "./commands/page";
import { createScriptCommand } from "./commands/script";
import { createSearchCommand } from "./commands/search";
import { ConfigurationManager } from "./configuration/configuration-manager";
import { initializeOrigin } from "./configuration/initialize-origin";
import { IConfigurationManager } from "./configuration/interface";
import { IImbricateConfigurationOrigin } from "./configuration/raw-definition";
import { addDirectoryExtension } from "./extensions/directory";
import { addOriginExtension } from "./extensions/origin";
import { addVerboseConfigurationExtension } from "./extensions/verbose-configuration";
import { addWorkingDirectoryOriginExtension } from "./extensions/working-directory-origin";
import { GlobalManager } from "./global/global-manager";
import { ITerminalController } from "./terminal/definition";
import { TTYTerminalController } from "./terminal/terminal";
import { debugLog } from "./util/debug";
import { handleError } from "./util/handle-error";

export const execute = async (): Promise<void> => {

    const ttyTerminalController: ITerminalController =
        TTYTerminalController.create();

    const configurationManager: IConfigurationManager =
        await ConfigurationManager.fromHomeConfigurationPath(ttyTerminalController);

    configurationManager.registerOriginConstructor("file-system", (
        origin: IImbricateConfigurationOrigin,
    ) => {
        return FileSystemImbricateOrigin.withPayloads(
            origin.payloads as FileSystemOriginPayload,
        );
    });

    await executeWithConfiguration(
        ttyTerminalController,
        configurationManager,
        process.argv,
    );
};

export const executeWithConfiguration = async (
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
    commands: string[],
): Promise<void> => {

    try {

        const globalManager = GlobalManager.fromScratch();

        const imbricateProgram = new Command();

        imbricateProgram
            .version("<current-version>")
            .usage("(i7e) [options] [command]")
            .name("imbricate")
            .description("Imbricate CLI");

        imbricateProgram
            .configureHelp({
                showGlobalOptions: true,
            });

        addDirectoryExtension(
            imbricateProgram,
            globalManager,
        );
        addOriginExtension(
            imbricateProgram,
            configurationManager,
            terminalController,
        );

        addVerboseConfigurationExtension(
            imbricateProgram,
            globalManager,
            terminalController,
        );

        addWorkingDirectoryOriginExtension(
            imbricateProgram,
            globalManager,
            terminalController,
        );

        imbricateProgram.addCommand(createCollectionCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));
        imbricateProgram.addCommand(createEditingCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));
        imbricateProgram.addCommand(createOriginCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));
        imbricateProgram.addCommand(createPageCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));
        imbricateProgram.addCommand(createScriptCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));
        imbricateProgram.addCommand(createSearchCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));

        debugLog("Start Imbricate CLI");

        await initializeOrigin(globalManager, configurationManager);

        debugLog("Origin Initialized");

        imbricateProgram.parse(commands);
    } catch (error) {

        handleError(terminalController, error);
    }
};
