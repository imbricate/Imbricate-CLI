/**
 * @author WMXPY
 * @namespace Schema_Configuration
 * @description Parse
 */

import { ImbricateConfiguration } from "./definition";
import { RawImbricateConfiguration } from "./raw-definition";

export const parseImbricateConfiguration = (
    configuration: RawImbricateConfiguration,
): ImbricateConfiguration => {

    return {

        presets: typeof configuration.presets === "string"
            ? [configuration.presets]
            : configuration.presets,
    };
};
