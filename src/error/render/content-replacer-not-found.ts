/**
 * @author WMXPY
 * @namespace Error_Render
 * @description Content Replacer Not Found
 */

import { CLIRenderError } from "./render-error";

export class CLIRenderContentReplacerNotFound extends CLIRenderError {

    public static withPath(path: string): CLIRenderContentReplacerNotFound {

        return new CLIRenderContentReplacerNotFound(
            `Content replacer of template '${path}' not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIRenderContentReplacerNotFound", reason);

        Object.setPrototypeOf(this, CLIRenderContentReplacerNotFound.prototype);
    }
}
