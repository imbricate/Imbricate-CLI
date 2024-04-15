/**
 * @author WMXPY
 * @namespace Error_Search
 * @description Invalid Search Result
 */

import { formatLog } from "../../util/format-log";
import { CLISearchError } from "./search-error";

export class CLIInvalidSearchResult extends CLISearchError {

    public static withResult(result: any): CLIInvalidSearchResult {

        return new CLIInvalidSearchResult(
            `Invalid search result: ${formatLog(result)}`,
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
