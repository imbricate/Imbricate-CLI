/**
 * @author WMXPY
 * @namespace Error_Search
 * @description Invalid Limit
 */

import { CLISearchError } from "./search-error";

export class CLISearchInvalidLimit extends CLISearchError {

    public static notANumber(value: string): CLISearchInvalidLimit {

        return new CLISearchInvalidLimit(
            `Invalid search limit: ${value} is not a number`,
        );
    }

    public static notAInteger(limit: number): CLISearchInvalidLimit {

        return new CLISearchInvalidLimit(
            `Invalid search limit: ${limit} is not an integer`,
        );
    }

    public static notPositive(limit: number): CLISearchInvalidLimit {

        return new CLISearchInvalidLimit(
            `Invalid search limit: ${limit} is not a positive number`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLISearchInvalidLimit", reason);

        Object.setPrototypeOf(this, CLISearchInvalidLimit.prototype);
    }
}
