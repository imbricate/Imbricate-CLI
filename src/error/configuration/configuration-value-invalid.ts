/**
 * @author WMXPY
 * @namespace Error_Configuration
 * @description Configuration Value Invalid
 */

import { CLIConfigurationError } from "./configuration-error";

export class CLIConfigurationValueInvalidError extends CLIConfigurationError {

    public static withValue(value: string): CLIConfigurationValueInvalidError {

        return new CLIConfigurationValueInvalidError(
            `Configuration value "${value}" is invalid`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIConfigurationValueInvalidError", reason);

        Object.setPrototypeOf(this, CLIConfigurationValueInvalidError.prototype);
    }
}
