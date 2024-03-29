/**
 * @author WMXPY
 * @namespace Error_Configuration
 * @description Configuration File Not Exist
 */

import { CLIConfigurationError } from "./configuration-error";

export class CLIConfigurationFileNotExistError extends CLIConfigurationError {

    public static withConfigurationPath(configurationPath: string): CLIConfigurationFileNotExistError {

        return new CLIConfigurationFileNotExistError(configurationPath);
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIConfigurationFileNotExistError", reason);

        Object.setPrototypeOf(this, CLIConfigurationFileNotExistError.prototype);
    }
}
