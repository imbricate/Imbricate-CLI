/**
 * @author WMXPY
 * @namespace Error
 * @description Unknown
 */

import { CLIError } from "./cli-error";

export class CLIUnknownError extends CLIError {

    public static withError(error: Error): CLIUnknownError {

        return new CLIUnknownError(error.message);
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIUnknownError", reason);

        Object.setPrototypeOf(this, CLIUnknownError.prototype);
    }
}
