/**
 * @author WMXPY
 * @description CLI
 */

import { IImbricateConfigurationOrigin } from "@imbricate/local-fundamental";
import { FileSystemImbricateOrigin, FileSystemOriginPayload } from "@imbricate/origin-file-system";
import { MongoImbricateOrigin } from "@imbricate/origin-mongo";
import { Command } from "commander";
import { createBinaryCommand } from "./commands/binary";
import { createCollectionCommand } from "./commands/collection";
import { createConfigCommand } from "./commands/config";
import { createEditingCommand } from "./commands/editing";
import { createOriginCommand } from "./commands/origin";
import { createPageCommand } from "./commands/page";
import { createScriptCommand } from "./commands/script";
import { createSearchCommand } from "./commands/search";
import { ConfigurationManager } from "./configuration/configuration-manager";
import { initializeOrigin } from "./configuration/initialize-origin";
import { IConfigurationManager } from "./configuration/interface";
import { addDirectoryExtension } from "./extensions/directory";
import { addOriginExtension } from "./extensions/origin";
import { addProfileExtension } from "./extensions/profile";
import { addVerboseConfigurationExtension } from "./extensions/verbose-configuration";
import { addWorkingDirectoryOriginExtension } from "./extensions/working-directory-origin";
import { GlobalManager } from "./global/global-manager";
import { ITerminalController } from "./terminal/definition";
import { TTYTerminalController } from "./terminal/terminal";
import { debugLog } from "./util/debug";
import { getApplicationDescription } from "./util/description";
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

    configurationManager.registerOriginConstructor("mongo", (
        origin: IImbricateConfigurationOrigin,
    ) => {
        return MongoImbricateOrigin.create(
            origin.payloads.connectionString as string,
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

    const globalManager = GlobalManager.fromScratch();
    const imbricateProgram = new Command();

    try {

        imbricateProgram
            .version("<current-version>")
            .usage("[options] [command]")
            .name("imbricate (i7e)")
            .description(getApplicationDescription());

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
            globalManager,
            terminalController,
        );
        addProfileExtension(
            imbricateProgram,
            globalManager,
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

        imbricateProgram.addCommand(createBinaryCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));
        imbricateProgram.addCommand(createCollectionCommand(
            globalManager,
            terminalController,
            configurationManager,
        ));
        imbricateProgram.addCommand(createConfigCommand(
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

        await imbricateProgram.parseAsync(commands);
    } catch (error) {

        handleError(terminalController, error);
    } finally {

        for (const origin of globalManager.originManager.origins) {

            if (typeof origin.origin.dispose === "function") {

                debugLog("Dispose Origin", origin.originName);
                await origin.origin.dispose();
            }
        }
    }
};
