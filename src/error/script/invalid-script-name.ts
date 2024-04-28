/**
 * @author WMXPY
 * @namespace Error_Script
 * @description Invalid Script Name
 */

import { CLIScriptError } from "./script-error";

export class CLIInvalidScriptName extends CLIScriptError {

    public static withScriptName(scriptName: string): CLIInvalidScriptName {

        return new CLIInvalidScriptName(
            `Invalid script name: ${scriptName}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIInvalidScriptName", reason);

        Object.setPrototypeOf(this, CLIInvalidScriptName.prototype);
    }
}
