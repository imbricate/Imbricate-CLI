/**
 * @author WMXPY
 * @namespace Util
 * @description Action Runner
 */

import { ITerminalController } from "../terminal/definition";
import { handleError } from "./handle-error";

export const createActionRunner = (
    terminalController: ITerminalController,
    action: (...args: any[]) => Promise<void> | void,
): ((...args: any[]) => Promise<void>) => {

    return async (...args: any[]): Promise<void> => {

        try {

            return await Promise.resolve(action(...args));
        } catch (error) {

            handleError(terminalController, error);
        }
    };
};
