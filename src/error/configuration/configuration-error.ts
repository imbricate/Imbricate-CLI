/**
 * @author WMXPY
 * @namespace Error_Configuration
 * @description Configuration Error
 */

import { CLIError } from "../cli-error";

export class CLIConfigurationError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIConfigurationError.prototype);
    }
}
