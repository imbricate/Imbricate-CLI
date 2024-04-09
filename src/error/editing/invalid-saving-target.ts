/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Save Target Failed
 */

import { SavingTarget } from "../../editing/definition";
import { CLIEditingError } from "./editing-error";

export class CLIInvalidSavingTarget extends CLIEditingError {

    public static withSavingTarget(
        savingTarget: SavingTarget<any>,
    ): CLIInvalidSavingTarget {

        return new CLIInvalidSavingTarget(
            `Invalid Saving Target: ${JSON.stringify(savingTarget)}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIInvalidSavingTarget", reason);

        Object.setPrototypeOf(this, CLIInvalidSavingTarget.prototype);
    }
}
