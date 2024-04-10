/**
 * @author WMXPY
 * @namespace Error_Profile
 * @description Profile Is Default
 */

import { CLIProfileError } from "./profile-error";

export class CLIProfileIsDefault extends CLIProfileError {

    public static withProfileName(
        profileName: string,
    ): CLIProfileIsDefault {

        return new CLIProfileIsDefault(
            `Profile: ${profileName} is default`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIProfileIsDefault", reason);

        Object.setPrototypeOf(this, CLIProfileIsDefault.prototype);
    }
}
