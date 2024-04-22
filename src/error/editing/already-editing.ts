/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Already Editing
 */

import { SavingTarget } from "../../editing/definition";
import { formatLog } from "../../util/format-log";
import { CLIEditingError } from "./editing-error";

export class CLIAlreadyEditing extends CLIEditingError {

    public static withSavingTarget(
        savingTarget: SavingTarget<any>,
    ): CLIAlreadyEditing {

        return new CLIAlreadyEditing(
            `Already Editing: ${formatLog(savingTarget)}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIAlreadyEditing", reason);

        Object.setPrototypeOf(this, CLIAlreadyEditing.prototype);
    }
}
