/**
 * @author WMXPY
 * @namespace Error_Binary
 * @description Binary Error
 */

import { CLIError } from "../cli-error";

export class CLIBinaryError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIBinaryError.prototype);
    }
}
