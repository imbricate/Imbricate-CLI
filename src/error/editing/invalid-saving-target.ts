/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Invalid Saving Target
 */

import { SavingTarget } from "@imbricate/local-fundamental";
import { formatLog } from "../../util/format-log";
import { CLIEditingError } from "./editing-error";

export class CLIInvalidSavingTarget extends CLIEditingError {

    public static withSavingTarget(
        savingTarget: SavingTarget<any>,
    ): CLIInvalidSavingTarget {

        return new CLIInvalidSavingTarget(
            `Invalid Saving Target: ${formatLog(savingTarget)}`,
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
