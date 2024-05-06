/**
 * @author WMXPY
 * @namespace Error_Collection
 * @description Collection Not Found
 */

import { CLICollectionError } from "./collection-error";

export class CLICollectionNotFound extends CLICollectionError {

    public static withCollectionName(
        collectionName: string,
    ): CLICollectionNotFound {

        return new CLICollectionNotFound(
            `Collection named '${collectionName}' not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLICollectionNotFound", reason);

        Object.setPrototypeOf(this, CLICollectionNotFound.prototype);
    }
}
