/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Invalid Origin Config
 */

import { CLIOriginError } from "./origin-error";

export class CLIInvalidOriginConfig extends CLIOriginError {

    public static withConfigNameValueAndReason(
        configName: string,
        configValue: any,
        reason: any,
    ): CLIInvalidOriginConfig {

        return new CLIInvalidOriginConfig(
            `Invalid origin config: ${configName} with value: ${configValue}, reason: ${reason}`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "CLIInvalidOriginConfig", reason);

        Object.setPrototypeOf(this, CLIInvalidOriginConfig.prototype);
    }
}
