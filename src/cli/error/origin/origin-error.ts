/**
 * @author WMXPY
 * @namespace CLI_Error_Origin
 * @description Origin Error
 */

import { CLIError } from "../cli-error";

export class CLIOriginError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIOriginError.prototype);
    }
}
