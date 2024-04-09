/**
 * @author WMXPY
 * @namespace Util
 * @description Execute Command
 */

import { exec } from "child_process";
import { ITerminalController } from "../terminal/definition";


const splitAndPrint = (
    text: string,
    terminalController: ITerminalController,
    error: boolean,
): void => {

    const lines: string[] = text.split("\n");

    for (const line of lines) {

        if (line.trim() === "") {
            continue;
        }

        if (error) {
            terminalController.printErrorMessage(`[COMMAND-ERROR] ${line}`);
        } else {
            terminalController.printInfo(`[COMMAND] ${line}`);
        }
    }
};

export const executeCommand = async (
    command: string,
    terminalController: ITerminalController,
): Promise<string> => {

    return new Promise<string>((
        resolve: (value: string) => void,
        reject: (reason: any) => void,
    ) => {

        exec(command, (error: any, stdout: string, stderr: string) => {

            splitAndPrint(stdout, terminalController, false);
            splitAndPrint(stderr, terminalController, true);

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