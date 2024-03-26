/**
 * @author WMXPY
 * @namespace CLI_Extensions
 * @description Directory
 */

import { Command, Option } from "commander";
import { GlobalManager } from "../global/global-manager";
import { fixDirectory } from "../util/fix-directory";

export const addDirectoryExtension = (
    program: Command,
    globalManager: GlobalManager,
): void => {

    const directoryOption = new Option(
        "-d, --directory <path>",
        "specify working directory",
    );

    program.addOption(directoryOption);
    program.on("option:directory", (directory?: string) => {

        const fixedDirectory: string = fixDirectory(directory);
        globalManager.setWorkingDirectory(fixedDirectory);
    });
};
