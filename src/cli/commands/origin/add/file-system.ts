/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin_Add
 * @description File System
 */

import { Command } from "commander";
import { GlobalManagerOriginResponse } from "../../../global/definition";
import { GlobalManager } from "../../../global/global-manager";
import { createConfiguredCommand } from "../../../util/command";
import { resolveDirectory } from "../../../util/fix-directory";

type OriginAddFileSystemCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginAddFileSystemCommand = (
    globalManager: GlobalManager,
): Command => {

    const fileSystem: Command = createConfiguredCommand("file-system");

    fileSystem
        .description("add new file system origin")
        .option("-q, --quiet", "quite mode")
        .argument("<basePath>", "base path of the file system")
        .action(async (
            basePath: string,
            _options: OriginAddFileSystemCommandOptions,
        ): Promise<void> => {

            const fixedBasePath: string = resolveDirectory(basePath);

            const origins: GlobalManagerOriginResponse[] = globalManager.origins;

            console.log(fixedBasePath, origins);

            return;
        });

    return fileSystem;
};
