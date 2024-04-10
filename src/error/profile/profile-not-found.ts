/**
 * @author WMXPY
 * @namespace Error_Profile
 * @description Profile Not Found
 */

import { CLIProfileError } from "./profile-error";

export class CLIProfileNotFound extends CLIProfileError {

    public static withProfileName(
        profileName: string,
    ): CLIProfileNotFound {

        return new CLIProfileNotFound(
            `Profile: ${profileName} not found`,
        );
    }

    public static withDefaultProfile(): CLIProfileNotFound {

        return new CLIProfileNotFound(
            "Default Profile not found",
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIProfileNotFound", reason);

        Object.setPrototypeOf(this, CLIProfileNotFound.prototype);
    }
}
