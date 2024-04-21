/**
 * @author WMXPY
 * @namespace Error_Input
 * @description Input Error
 */

import { CLIError } from "../cli-error";

export class CLIInputError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIInputError.prototype);
    }
}
