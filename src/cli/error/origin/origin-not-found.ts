/**
 * @author WMXPY
 * @namespace CLI_Error_Configuration
 * @description Origin Not Found
 */

import { CLIOriginError } from "./origin-error";

export class CLIOriginNotFound extends CLIOriginError {

    public static withOriginName(originName: string): CLIOriginNotFound {

        return new CLIOriginNotFound(originName);
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIOriginNotFound", reason);

        Object.setPrototypeOf(this, CLIOriginNotFound.prototype);
    }
}
