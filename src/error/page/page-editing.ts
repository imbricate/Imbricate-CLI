/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Page Editing
 */

import { CLIPageError } from "./page-error";

export class CLIPageEditing extends CLIPageError {

    public static withIdentifier(identifier: string): CLIPageEditing {

        return new CLIPageEditing(
            `Page: ${identifier} is currently being edited`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIPageEditing", reason);

        Object.setPrototypeOf(this, CLIPageEditing.prototype);
    }
}
