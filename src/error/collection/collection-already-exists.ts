/**
 * @author WMXPY
 * @namespace Error_Collection
 * @description Collection Already Exists
 */

import { CLICollectionError } from "./collection-error";

export class CLICollectionAlreadyExists extends CLICollectionError {

    public static withCollectionName(collectionName: string): CLICollectionAlreadyExists {

        return new CLICollectionAlreadyExists(
            `Collection named '${collectionName}' already exists`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLICollectionAlreadyExists", reason);

        Object.setPrototypeOf(this, CLICollectionAlreadyExists.prototype);
    }
}
