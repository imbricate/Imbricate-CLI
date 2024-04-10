/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Origin Is Active
 */

import { CLIOriginError } from "./origin-error";

export class CLIOriginIsActive extends CLIOriginError {

    public static withOriginName(originName: string): CLIOriginIsActive {

        return new CLIOriginIsActive(
            `Origin "${originName}" is active`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIOriginIsActive", reason);

        Object.setPrototypeOf(this, CLIOriginIsActive.prototype);
    }
}
