/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin_Add
 * @description File System
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIOriginInvalidOriginName } from "../../../error/origin/invalid-origin-name";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";
import { resolveDirectory } from "../../../util/fix-directory";

type OriginAddFileSystemCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginAddFileSystemCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const fileSystem: Command = createConfiguredCommand("file-system");

    fileSystem
        .description("add new file system origin")
        .option("-q, --quiet", "quite mode")
        .argument("<origin-name>", "origin name")
        .argument("<base-path>", "base path of the file system")
        .action(createActionRunner(terminalController, async (
            originName: string,
            basePath: string,
            _options: OriginAddFileSystemCommandOptions,
        ): Promise<void> => {

            if (originName.length < 3) {
                throw CLIOriginInvalidOriginName.withOriginName(originName);
            }

            const fixedBasePath: string = resolveDirectory(basePath);

            configurationManager.addOrigin({
                type: "file-system",
                originName: originName,
                payloads: {
                    basePath: fixedBasePath,
                },
            });

            return;
        }));

    return fileSystem;
};
