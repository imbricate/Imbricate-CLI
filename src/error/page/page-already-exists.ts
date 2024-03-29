/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Page Already Exists
 */

import { CLIPageError } from "./page-error";

export class CLIPageAlreadyExists extends CLIPageError {

    public static withPageName(pageName: string): CLIPageAlreadyExists {

        return new CLIPageAlreadyExists(
            `Page named '${pageName}' already exists`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIPageAlreadyExists", reason);

        Object.setPrototypeOf(this, CLIPageAlreadyExists.prototype);
    }
}
