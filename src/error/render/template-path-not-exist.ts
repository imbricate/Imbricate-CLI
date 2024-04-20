/**
 * @author WMXPY
 * @namespace Error_Render
 * @description Template Path Not Exist
 */

import { CLIRenderError } from "./render-error";

export class CLIRenderTemplatePathNotExist extends CLIRenderError {

    public static withPath(path: string): CLIRenderTemplatePathNotExist {

        return new CLIRenderTemplatePathNotExist(
            `Template file '${path}' not exist`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIRenderTemplatePathNotExist", reason);

        Object.setPrototypeOf(this, CLIRenderTemplatePathNotExist.prototype);
    }
}
