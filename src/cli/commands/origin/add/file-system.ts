/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin_Add
 * @description File System
 */

import { Command } from "commander";
import { ConfigurationManager } from "../../../configuration/configuration-manager";
import { CLIOriginInvalidOriginName } from "../../../error/origin/invalid-origin-name";
import { GlobalManager } from "../../../global/global-manager";
import { createConfiguredCommand } from "../../../util/command";
import { resolveDirectory } from "../../../util/fix-directory";

type OriginAddFileSystemCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginAddFileSystemCommand = (
    _globalManager: GlobalManager,
    configurationManager: ConfigurationManager,
): Command => {

    const fileSystem: Command = createConfiguredCommand("file-system");

    fileSystem
        .description("add new file system origin")
        .option("-q, --quiet", "quite mode")
        .argument("<originName>", "origin name")
        .argument("<basePath>", "base path of the file system")
        .action(async (
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
        });

    return fileSystem;
};
