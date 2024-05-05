/**
 * @author WMXPY
 * @namespace Error_Capability
 * @description Search Error
 */

import { CLIError } from "../cli-error";

export class CLICapabilityError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLICapabilityError.prototype);
    }
}
