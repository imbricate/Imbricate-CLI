/**
 * @author WMXPY
 * @namespace Error_Editing
 * @description Editing Error
 */

import { CLIError } from "../cli-error";

export class CLIEditingError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIEditingError.prototype);
    }
}
