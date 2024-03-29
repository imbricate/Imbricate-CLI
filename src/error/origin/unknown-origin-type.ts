/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Unknown Origin Type
 */

import { CLIOriginError } from "./origin-error";

export class CLIUnknownOriginType extends CLIOriginError {

    public static withOriginName(originType: string): CLIUnknownOriginType {

        return new CLIUnknownOriginType(
            `Origin type "${originType}" not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIUnknownOriginType", reason);

        Object.setPrototypeOf(this, CLIUnknownOriginType.prototype);
    }
}
