/**
 * @author WMXPY
 * @namespace Error_Input
 * @description Number Input
 */

import { CLIInputError } from "./invalid-input";

export class CLIInputNumberError extends CLIInputError {

    public static notANumber(value: string): CLIInputNumberError {

        return new CLIInputNumberError(
            `Input is not a number: ${value}`,
        );
    }

    public static notAInteger(value: number): CLIInputNumberError {

        return new CLIInputNumberError(
            `Input: ${value} is not an integer`,
        );
    }

    public static notPositive(value: number): CLIInputNumberError {

        return new CLIInputNumberError(
            `Input: ${value} is not a positive number`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIInputNumberError", reason);

        Object.setPrototypeOf(this, CLIInputNumberError.prototype);
    }
}
