/**
 * @author WMXPY
 * @namespace Error_Page
 * @description Save Target Failed
 */

import { CLIEditingError } from "./editing-error";

export class CLIEditingSaveTargetFiled extends CLIEditingError {

    public static originNotFound(
        originName: string,
    ): CLIEditingSaveTargetFiled {

        return new CLIEditingSaveTargetFiled(
            `Origin: ${originName} Not Found`,
        );
    }

    public static collectionNotFound(
        collectionName: string,
    ): CLIEditingSaveTargetFiled {

        return new CLIEditingSaveTargetFiled(
            `Collection: ${collectionName} Not Found`,
        );
    }

    public static pageNotFound(
        pageName: string,
    ): CLIEditingSaveTargetFiled {

        return new CLIEditingSaveTargetFiled(
            `Page: ${pageName} Not Found`,
        );
    }

    public static scriptNotFound(
        scriptName: string,
    ): CLIEditingSaveTargetFiled {

        return new CLIEditingSaveTargetFiled(
            `Script: ${scriptName} Not Found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIEditingSaveTargetFiled", reason);

        Object.setPrototypeOf(this, CLIEditingSaveTargetFiled.prototype);
    }
}
