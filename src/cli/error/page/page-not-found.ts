/**
 * @author WMXPY
 * @namespace CLI_Error_Page
 * @description Page Not Found
 */

import { CLIPageError } from "./page-error";

export class CLIPageNotFound extends CLIPageError {

    public static withPageTitle(pageTitle: string): CLIPageNotFound {

        return new CLIPageNotFound(
            `Page named '${pageTitle}' not found`,
        );
    }

    public static withPageIdentifier(pageIdentifier: string): CLIPageNotFound {

        return new CLIPageNotFound(
            `Page with identifier or pointer by '${pageIdentifier}' not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIPageNotFound", reason);

        Object.setPrototypeOf(this, CLIPageNotFound.prototype);
    }
}
