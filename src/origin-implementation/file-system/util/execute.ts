/**
 * @author WMXPY
 * @namespace FileSystem_Util
 * @description Execute
 */

import { exec } from "child_process";

export const executeCommand = async (command: string): Promise<string> => {

    return new Promise<string>((
        resolve: (value: string) => void,
        reject: (reason: any) => void,
    ) => {

        exec(command, (error: any, stdout: string, stderr: string) => {

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
