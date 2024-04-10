/**
 * @author WMXPY
 * @namespace Error_Editing
 * @description Too Many Files
 */

import { CLIEditingError } from "./editing-error";

export class CLIEditingTooManyFiles extends CLIEditingError {

    public static create(
        editingIdentifier: string,
        fileList: string[],
    ): CLIEditingTooManyFiles {

        return new CLIEditingTooManyFiles(
            `Editing: ${editingIdentifier} has too many files: ${fileList.join(", ")}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIEditingTooManyFiles", reason);

        Object.setPrototypeOf(this, CLIEditingTooManyFiles.prototype);
    }
}
