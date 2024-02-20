/**
 * @author WMXPY
 * @namespace Configuration
 * @description Parse
 */

import { ImbricateConfiguration } from "./definition";
import { RawImbricateConfiguration } from "./raw-definition";

export const parseRawImbricateConfiguration = (
    configuration: RawImbricateConfiguration,
): ImbricateConfiguration => {

    return {

        presets: typeof configuration.presets === "string"
            ? [configuration.presets]
            : configuration.presets,
    };
};
