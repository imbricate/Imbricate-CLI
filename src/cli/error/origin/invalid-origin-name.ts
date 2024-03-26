/**
 * @author WMXPY
 * @namespace CLI_Error_Configuration
 * @description Configuration File Not Exist
 */

import { CLIOriginError } from "./origin-error";

export class CLIOriginInvalidOriginName extends CLIOriginError {

    public static withOriginName(originName: string): CLIOriginInvalidOriginName {

        return new CLIOriginInvalidOriginName(originName);
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIOriginInvalidOriginName", reason);

        Object.setPrototypeOf(this, CLIOriginInvalidOriginName.prototype);
    }
}
