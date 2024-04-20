/**
 * @author WMXPY
 * @namespace Error_Render
 * @description Render Error
 */

import { CLIError } from "../cli-error";

export class CLIRenderError extends CLIError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, CLIRenderError.prototype);
    }
}
