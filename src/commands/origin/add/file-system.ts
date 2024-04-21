/**
 * @author WMXPY
 * @namespace Commands_Origin_Add
 * @description File System
 */

import { FileSystemOriginPayload } from "@imbricate/origin-file-system";
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

    readonly asynchronousPoolLimit: string;
};

export const createOriginAddFileSystemCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const fileSystem: Command = createConfiguredCommand("file-system");

    fileSystem
        .description("add new file system origin")
        .requiredOption(
            "-a, --asynchronous-pool-limit <limit>",
            "asynchronous pool limit (required)",
        )
        .option("-q, --quiet", "quite mode")
        .argument("<origin-name>", "origin name")
        .argument("<base-path>", "base path of the file system")
        .action(createActionRunner(terminalController, async (
            originName: string,
            basePath: string,
            options: OriginAddFileSystemCommandOptions,
        ): Promise<void> => {

            if (originName.length < 3) {
                throw CLIOriginInvalidOriginName.withOriginName(originName);
            }

            const numberedLimit: number = Number(options.asynchronousPoolLimit);

            if (isNaN(numberedLimit)) {
                throw new Error("Asynchronous pool limit must be a number");
            }

            if (!Number.isInteger(numberedLimit)) {
                throw new Error("Asynchronous pool limit must be an integer");
            }

            if (numberedLimit < 1) {
                throw new Error("Asynchronous pool limit must be greater than 0");
            }

            const fixedBasePath: string = resolveDirectory(basePath);

            const payloads: FileSystemOriginPayload = {
                basePath: fixedBasePath,
                asynchronousPoolLimit: numberedLimit,
            };

            configurationManager.addOrigin({
                type: "file-system",
                originName: originName,
                payloads,
            });

            return;
        }));

    return fileSystem;
};
