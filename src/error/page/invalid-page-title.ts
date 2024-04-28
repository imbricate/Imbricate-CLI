/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Invalid Page Title
 */

import { CLIPageError } from "./page-error";

export class CLIInvalidPageTitle extends CLIPageError {

    public static withPageTitle(
        pageTitle: string,
    ): CLIInvalidPageTitle {

        return new CLIInvalidPageTitle(
            `Invalid page title: ${pageTitle}`,
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
