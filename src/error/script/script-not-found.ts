/**
 * @author WMXPY
 * @namespace Error_Script
 * @description Script Not Found
 */

import { CLIScriptError } from "./script-error";

export class CLIScriptNotFound extends CLIScriptError {

    public static withScriptName(scriptName: string): CLIScriptNotFound {

        return new CLIScriptNotFound(
            `Script named '${scriptName}' not found`,
        );
    }

    public static withScriptIdentifier(scriptIdentifier: string): CLIScriptNotFound {

        return new CLIScriptNotFound(
            `Script with identifier or pointer by '${scriptIdentifier}' not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIScriptNotFound", reason);

        Object.setPrototypeOf(this, CLIScriptNotFound.prototype);
    }
}
