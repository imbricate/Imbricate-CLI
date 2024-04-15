/**
 * @author WMXPY
 * @namespace Util
 * @description Execute Command
 */

import { ChildProcess, spawn } from "child_process";
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
    commands: string[],
    terminalController: ITerminalController,
): Promise<void> => {

    return new Promise<void>((
        resolve: (value: void) => void,
        reject: (reason: any) => void,
    ) => {

        const fixedList: string[] = [...commands];
        const command: string | undefined = fixedList.shift();

        if (!command) {
            reject(new Error("No command"));
            return;
        }

        const spawned: ChildProcess = spawn(command, fixedList, {
            shell: true,
            stdio: "pipe",
        });

        if (!spawned.stdout || !spawned.stderr) {
            reject(new Error("No stdout or stderr"));
            return;
        }

        spawned.stdout.on("data", (data: any) => {
            splitAndPrint(data.toString(), terminalController, false);
        });

        spawned.stderr.on("data", (data: any) => {
            splitAndPrint(data.toString(), terminalController, true);
        });

        spawned.on("message", (message: any) => {
            terminalController.printInfo(`[COMMAND MESSAGE] ${message}`);
        });

        spawned.on("close", (code: number) => {
            if (code === 0) {
                resolve();
            } else {
                reject(code);
            }
        });
    });
};