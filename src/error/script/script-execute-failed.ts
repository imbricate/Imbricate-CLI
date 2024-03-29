/**
 * @author WMXPY
 * @namespace Error_Script
 * @description Script Execute Failed
 */

import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { CLIScriptError } from "./script-error";

export class CLIScriptExecuteFailed extends CLIScriptError {

    public static create(
        scriptName: string,
        markedResult: MarkedResult,
    ): CLIScriptExecuteFailed {

        switch (markedResult.signal) {

            case END_SIGNAL.FAILED:
                return new CLIScriptExecuteFailed(
                    `Script named '${scriptName}' execute failed, message: ${markedResult.error.message}`,
                    markedResult,
                );
            case END_SIGNAL.TERMINATED:
                return new CLIScriptExecuteFailed(
                    `Script named '${scriptName}' execute terminated, from: ${markedResult.trace.scriptLocation.toString()}`,
                    markedResult,
                );
        }

        return new CLIScriptExecuteFailed(
            `Script named '${scriptName}' execute failed with unknown reason`,
            markedResult,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIScriptExecuteFailed", reason);

        Object.setPrototypeOf(this, CLIScriptExecuteFailed.prototype);
    }
}
