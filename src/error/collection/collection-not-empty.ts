/**
 * @author WMXPY
 * @namespace Error_Collection
 * @description Collection Not Empty
 */

import { CLICollectionError } from "./collection-error";

export class CLICollectionNotEmpty extends CLICollectionError {

    public static withCollectionName(collectionName: string): CLICollectionNotEmpty {

        return new CLICollectionNotEmpty(
            `Collection named "${collectionName}" is not empty`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLICollectionNotEmpty", reason);

        Object.setPrototypeOf(this, CLICollectionNotEmpty.prototype);
    }
}
