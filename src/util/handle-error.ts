/**
 * @author WMXPY
 * @namespace Util
 * @description Handle Error
 */

import { CLIError } from "../error/cli-error";
import { CLIUnknownError } from "../error/unknown";
import { ITerminalController } from "../terminal/definition";
import { isDebug, isTest } from "./debug";

export const handleError = (
    terminalController: ITerminalController,
    error: unknown,
): void => {

    if (isDebug()) {
        throw error;
    }

    const fixedError: CLIError = error instanceof CLIError
        ? error
        : error instanceof Error
            ? CLIUnknownError.withError(error)
            : CLIUnknownError.withError(new Error(error as any));

    terminalController.printErrorMessage(fixedError.toString());

    if (process.stdout.isTTY && !isTest()) {
        process.exit(1);
    }
};
