/**
 * @author WMXPY
 * @namespace Terminal
 * @description Open File
 */

import { pathExists, readTextFile, removeFile, writeTextFile } from "@sudoo/io";
import { executeCommand } from "../util/execute-command";
import { fixImbricateHomeDirectory, fixImbricateTempDirectory } from "../util/fix-directory";

export const openContentAndUpdate = async (
    command: string,
    content: string,
    fileName: string,
): Promise<string> => {

    const tempFilePath: string = fixImbricateTempDirectory(fileName);
    const tempEditingConfigPath: string = fixImbricateHomeDirectory("editing.json");

    const editingExist: boolean = await pathExists(tempEditingConfigPath);

    if (editingExist) {
        throw new Error("Already editing");
    }

    const currentTime: number = new Date().getTime();
    const editingInfo: string = JSON.stringify({
        path: tempFilePath,
        startedAt: currentTime,
    });

    await writeTextFile(tempFilePath, content);
    await writeTextFile(tempEditingConfigPath, editingInfo);

    await openFileAndMonitor(command, tempFilePath);

    const updatedContent: string = await readTextFile(tempFilePath);

    await removeFile(tempFilePath);
    await removeFile(tempEditingConfigPath);

    return updatedContent;
};

export const openFileAndMonitor = async (command: string, path: string): Promise<string> => {

    const fixedCommand: string = command
        .replace("{path}", `"${path}"`);

    const output = await executeCommand(fixedCommand);

    return output;
};
