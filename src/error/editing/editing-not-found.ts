/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Editing Not Found
 */

import { CLIEditingError } from "./editing-error";

export class CLIEditingNotFound extends CLIEditingError {

    public static withPartialIdentifier(
        identifier: string,
    ): CLIEditingNotFound {

        return new CLIEditingNotFound(
            `Editing with partial identifier: ${identifier} not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIEditingNotFound", reason);

        Object.setPrototypeOf(this, CLIEditingNotFound.prototype);
    }
}
