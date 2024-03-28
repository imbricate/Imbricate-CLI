/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description Open Script
 */

import { FileSystemOriginPayload } from "../definition/origin";
import { executeCommand } from "../util/execute";
import { getScriptsFolderPath } from "../util/path-joiner";
import { ensureScriptFolders, fixScriptFileName } from "./common";

export const fileSystemOriginOpenScript = async (
    basePath: string,
    identifier: string,
    payload: FileSystemOriginPayload,
): Promise<string> => {

    await ensureScriptFolders(basePath);

    const scriptFileName: string = fixScriptFileName(identifier);
    const scriptFolderPath: string = getScriptsFolderPath(basePath, scriptFileName);

    const command: string = payload.startEditorCommand
        .replace("{path}", `"${scriptFolderPath}"`);

    const output = await executeCommand(command);

    return output;
};
