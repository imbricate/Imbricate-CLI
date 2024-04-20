/**
 * @author WMXPY
 * @namespace Error_Render
 * @description Output Already Exists
 */

import { CLIRenderError } from "./render-error";

export class CLIRenderOutputAlreadyExists extends CLIRenderError {

    public static withPath(path: string): CLIRenderOutputAlreadyExists {

        return new CLIRenderOutputAlreadyExists(
            `Output file '${path}' already exists`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIRenderOutputAlreadyExists", reason);

        Object.setPrototypeOf(this, CLIRenderOutputAlreadyExists.prototype);
    }
}
