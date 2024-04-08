/**
 * @author WMXPY
 * @namespace Error_Search
 * @description Search Error
 */

import { CLIError } from "../cli-error";

export class CLISearchError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLISearchError.prototype);
    }
}
