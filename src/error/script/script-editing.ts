/**
 * @author WMXPY
 * @namespace Error_Script
 * @description Script Editing
 */

import { CLIScriptError } from "./script-error";

export class CLIScriptEditing extends CLIScriptError {

    public static withScriptIdentifier(identifier: string): CLIScriptEditing {

        return new CLIScriptEditing(
            `Script named '${identifier}' already exists`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIScriptEditing", reason);

        Object.setPrototypeOf(this, CLIScriptEditing.prototype);
    }
}
