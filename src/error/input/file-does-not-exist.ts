/**
 * @author WMXPY
 * @namespace Error_Input
 * @description Number Input
 */

import { CLIInputError } from "./invalid-input";

export class CLIFileDoesNotExistError extends CLIInputError {

    public static fileNotExist(path: string): CLIFileDoesNotExistError {

        return new CLIFileDoesNotExistError(
            `File path does not exists: ${path}`,
        );
    }

    public static fileIsDirectory(path: string): CLIFileDoesNotExistError {

        return new CLIFileDoesNotExistError(
            `File path is a directory: ${path}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIFileDoesNotExistError", reason);

        Object.setPrototypeOf(this, CLIFileDoesNotExistError.prototype);
    }
}
