/**
 * @author WMXPY
 * @namespace Error_Collection
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
