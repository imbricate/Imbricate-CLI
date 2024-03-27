/**
 * @author WMXPY
 * @namespace CLI_Error_Origin
 * @description Collection Error
 */

import { CLIError } from "../cli-error";

export class CLICollectionError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLICollectionError.prototype);
    }
}
