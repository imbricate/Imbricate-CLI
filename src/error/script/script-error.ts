/**
 * @author WMXPY
 * @namespace Error_Script
 * @description Script Error
 */

import { CLIError } from "../cli-error";

export class CLIScriptError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIScriptError.prototype);
    }
}
