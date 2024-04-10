/**
 * @author WMXPY
 * @namespace Error_Profile
 * @description Profile Error
 */

import { CLIError } from "../cli-error";

export class CLIProfileError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIProfileError.prototype);
    }
}
