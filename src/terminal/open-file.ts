/**
 * @author WMXPY
 * @namespace Terminal
 * @description Open File
 */

import { writeTextFile } from "@sudoo/io";
import { executeCommand } from "../util/execute-command";
import { fixImbricateHomeDirectory, fixImbricateTempDirectory } from "../util/fix-directory";

export const openContentAndMonitor = async (
    command: string,
    content: string,
    fileName: string,
): Promise<string> => {

    const tempFilePath: string = fixImbricateTempDirectory(fileName);
    const tempEditingConfigPath: string = fixImbricateHomeDirectory("editing.json");
    const editingInfo: string = JSON.stringify({
        path: tempFilePath,
    });

    await writeTextFile(tempFilePath, content);
    await writeTextFile(tempEditingConfigPath, editingInfo);

    return await openFileAndMonitor(command, tempFilePath);
};

export const openFileAndMonitor = async (command: string, path: string): Promise<string> => {

    const fixedCommand: string = command
        .replace("{path}", `"${path}"`);

    const output = await executeCommand(fixedCommand);

    return output;
};
