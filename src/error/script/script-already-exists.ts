/**
 * @author WMXPY
 * @namespace Error_Script
 * @description Script Already Exists
 */

import { CLIScriptError } from "./script-error";

export class CLIScriptAlreadyExists extends CLIScriptError {

    public static withScriptName(scriptName: string): CLIScriptAlreadyExists {

        return new CLIScriptAlreadyExists(
            `Script named '${scriptName}' already exists`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIScriptAlreadyExists", reason);

        Object.setPrototypeOf(this, CLIScriptAlreadyExists.prototype);
    }
}
