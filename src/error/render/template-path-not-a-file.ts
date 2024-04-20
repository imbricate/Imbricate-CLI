/**
 * @author WMXPY
 * @namespace Error_Render
 * @description Template Path Not A File
 */

import { CLIRenderError } from "./render-error";

export class CLIRenderTemplatePathNotAFile extends CLIRenderError {

    public static withPath(path: string): CLIRenderTemplatePathNotAFile {

        return new CLIRenderTemplatePathNotAFile(
            `Template file '${path}' not a file`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIRenderTemplatePathNotAFile", reason);

        Object.setPrototypeOf(this, CLIRenderTemplatePathNotAFile.prototype);
    }
}
