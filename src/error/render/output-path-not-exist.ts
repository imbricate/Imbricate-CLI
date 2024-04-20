/**
 * @author WMXPY
 * @namespace Error_Render
 * @description Output Path Not Exist
 */

import { CLIRenderError } from "./render-error";

export class CLIRenderOutputPathNotExist extends CLIRenderError {

    public static withDirectory(path: string): CLIRenderOutputPathNotExist {

        return new CLIRenderOutputPathNotExist(
            `Output directory '${path}' not exist`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIRenderOutputPathNotExist", reason);

        Object.setPrototypeOf(this, CLIRenderOutputPathNotExist.prototype);
    }
}
