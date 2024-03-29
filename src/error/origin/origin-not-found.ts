/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Origin Not Found
 */

import { CLIOriginError } from "./origin-error";

export class CLIOriginNotFound extends CLIOriginError {

    public static withOriginName(originName: string): CLIOriginNotFound {

        return new CLIOriginNotFound(
            `Origin "${originName}" not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIOriginNotFound", reason);

        Object.setPrototypeOf(this, CLIOriginNotFound.prototype);
    }
}
