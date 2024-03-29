/**
 * @author WMXPY
 * @namespace Error_Script
 * @description Script Invalid Input
 */

import { CLIScriptError } from "./script-error";

export class CLIScriptInvalidInput extends CLIScriptError {

    public static withMessage(message: string): CLIScriptInvalidInput {

        return new CLIScriptInvalidInput(message);
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIScriptInvalidInput", reason);

        Object.setPrototypeOf(this, CLIScriptInvalidInput.prototype);
    }
}
