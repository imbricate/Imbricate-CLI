/**
 * @author WMXPY
 * @namespace Error_Collection
 * @description Collection Folder Occupied
 */

import { CLICollectionError } from "./collection-error";

export class CLICollectionFolderOccupied extends CLICollectionError {

    public static withCollectionName(
        collectionName: string,
        folderPath: string,
    ): CLICollectionFolderOccupied {

        return new CLICollectionFolderOccupied(
            `Collection folder for '${collectionName}' is occupied by other files, path: ${folderPath}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLICollectionFolderOccupied", reason);

        Object.setPrototypeOf(this, CLICollectionFolderOccupied.prototype);
    }
}
