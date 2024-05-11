/**
 * @author WMXPY
 * @namespace Commands_Binary
 * @description Put
 */

import { IImbricateOrigin } from "@imbricate/core";
import { isFile, pathExists, readBufferFile } from "@sudoo/io";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIFileDoesNotExistError } from "../../error/input/file-does-not-exist";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { getFileNameAndExtension } from "../../util/fix-directory";

type BinaryPutCommandOptions = {

    readonly json?: boolean;
};

export const createBinaryPutCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("put");

    listCommand
        .description("put a binary file into imbricate binary storage and get url")
        .argument("<file>", "file path to put")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            filePath: string,
            options: BinaryPutCommandOptions,
        ): Promise<void> => {

            const filePathExists: boolean = await pathExists(filePath);

            if (!filePathExists) {
                throw CLIFileDoesNotExistError.fileNotExist(filePath);
            }

            const filePathIsFile: boolean = await isFile(filePath);

            if (!filePathIsFile) {
                throw CLIFileDoesNotExistError.fileIsDirectory(filePath);
            }

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const fileBuffer: Buffer = await readBufferFile(filePath);
            const fileBase64: string = fileBuffer.toString("base64");

            const fileName: string = getFileNameAndExtension(filePath);

            const binaryStorage = currentOrigin.getBinaryStorage();

            const url: string = await binaryStorage.putBinaryBase64(
                fileBase64,
                fileName,
            );

            if (options.json) {
                terminalController.printJsonInfo({
                    url,
                });
                return;
            }

            terminalController.printInfo("File uploaded successfully");
            terminalController.printInfo(url);
            return;
        }));

    return listCommand;
};
