/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Active Origin Not Found
 */

import { CLIOriginError } from "./origin-error";

export class CLIActiveOriginNotFound extends CLIOriginError {

    public static create(): CLIActiveOriginNotFound {

        return new CLIActiveOriginNotFound(
            "No origin is currently active",
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIActiveOriginNotFound", reason);

        Object.setPrototypeOf(this, CLIActiveOriginNotFound.prototype);
    }
}
