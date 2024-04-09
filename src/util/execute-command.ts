/**
 * @author WMXPY
 * @namespace Util
 * @description Execute Command
 */

import { exec } from "child_process";
import { ITerminalController } from "../terminal/definition";

export const executeCommand = async (
    command: string,
    terminalController: ITerminalController,
): Promise<string> => {

    return new Promise<string>((
        resolve: (value: string) => void,
        reject: (reason: any) => void,
    ) => {

        exec(command, (error: any, stdout: string, stderr: string) => {

            if (stdout.trim() !== "") {
                terminalController.printInfo(`[COMMAND] ${stdout}`);
            }

            if (stderr.trim() !== "") {
                terminalController.printErrorMessage(`[COMMAND-ERROR] ${stderr}`);
            }

            if (error) {
                reject(error);
                return;
            }

            if (stderr) {
                reject(stderr);
                return;
            }

            resolve(stdout);
        });
    });
};