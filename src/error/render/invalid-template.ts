/**
 * @author WMXPY
 * @namespace Error_Render
 * @description Invalid Template
 */

import { CLIRenderError } from "./render-error";

export class CLIRenderInvalidTemplate extends CLIRenderError {

    public static replacerNotFound(
        path: string,
        replacer: string,
    ): CLIRenderInvalidTemplate {

        return new CLIRenderInvalidTemplate(
            `Replacer '${replacer}' of template '${path}' not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIRenderInvalidTemplate", reason);

        Object.setPrototypeOf(this, CLIRenderInvalidTemplate.prototype);
    }
}
