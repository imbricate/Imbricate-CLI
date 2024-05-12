/**
 * @author WMXPY
 * @namespace Error_Binary
 * @description Invalid Binary
 */

import { CLIBinaryError } from "./binary-error";

export class CLIBinaryInvalidBinary extends CLIBinaryError {

    public static withFileName(
        fileName: string,
    ): CLIBinaryInvalidBinary {

        return new CLIBinaryInvalidBinary(
            `Invalid binary file: ${fileName}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIBinaryInvalidBinary", reason);

        Object.setPrototypeOf(this, CLIBinaryInvalidBinary.prototype);
    }
}
