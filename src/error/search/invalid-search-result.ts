/**
 * @author WMXPY
 * @namespace Error_Search
 * @description Invalid Search Result
 */

import { CLISearchError } from "./search-error";

export class CLIInvalidSearchResult extends CLISearchError {

    public static withResult(result: any): CLIInvalidSearchResult {

        return new CLIInvalidSearchResult(
            `Invalid search result: ${JSON.stringify(result)}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIInvalidSearchResult", reason);

        Object.setPrototypeOf(this, CLIInvalidSearchResult.prototype);
    }
}
