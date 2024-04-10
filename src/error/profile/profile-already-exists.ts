/**
 * @author WMXPY
 * @namespace Error_Profile
 * @description Profile Already Exists
 */

import { CLIProfileError } from "./profile-error";

export class CLIProfileAlreadyExists extends CLIProfileError {

    public static withProfileName(
        profileName: string,
    ): CLIProfileAlreadyExists {

        return new CLIProfileAlreadyExists(
            `Profile: ${profileName} already exists`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIProfileAlreadyExists", reason);

        Object.setPrototypeOf(this, CLIProfileAlreadyExists.prototype);
    }
}
