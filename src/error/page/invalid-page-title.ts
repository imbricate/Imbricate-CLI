/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Invalid Page Title
 */

import { CLIPageError } from "./page-error";

export class CLIInvalidPageTitle extends CLIPageError {

    public static withPageTitle(
        pageTitle: string,
        reason: string,
    ): CLIInvalidPageTitle {

        return new CLIInvalidPageTitle(
            `Invalid page title: ${pageTitle}, reason: ${reason}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIInvalidPageTitle", reason);

        Object.setPrototypeOf(this, CLIInvalidPageTitle.prototype);
    }
}
