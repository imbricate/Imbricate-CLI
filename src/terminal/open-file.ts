/**
 * @author WMXPY
 * @namespace Terminal
 * @description Open File
 */

import { executeCommand } from "../util/execute-command";

export const openFileAndMonitor = async (command: string, path: string): Promise<string> => {

    const fixedCommand: string = command
        .replace("{path}", `"${path}"`);

    const output = await executeCommand(fixedCommand);

    return output;
};
