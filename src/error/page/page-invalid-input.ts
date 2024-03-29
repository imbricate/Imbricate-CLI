/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Page Invalid Input
 */

import { CLIPageError } from "./page-error";

export class CLIPageInvalidInput extends CLIPageError {

    public static withMessage(message: string): CLIPageInvalidInput {

        return new CLIPageInvalidInput(message);
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIPageInvalidInput", reason);

        Object.setPrototypeOf(this, CLIPageInvalidInput.prototype);
    }
}
