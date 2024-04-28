/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Page Already Exists
 */

import { CLIPageError } from "./page-error";

export class CLIPageAlreadyExists extends CLIPageError {

    public static withPageNameAndDirectories(
        pageName: string,
        directories: string[],
    ): CLIPageAlreadyExists {

        const fixedPath: string = [...directories, pageName].join("/");

        return new CLIPageAlreadyExists(
            `Page '${fixedPath}' already exists`,
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
