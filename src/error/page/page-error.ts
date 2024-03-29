/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Page Error
 */

import { CLIError } from "../cli-error";

export class CLIPageError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIPageError.prototype);
    }
}
