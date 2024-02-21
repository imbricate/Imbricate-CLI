/**
 * @author WMXPY
 * @namespace Configuration
 * @description Parse
 */

import { IImbricateConfiguration } from "./definition";
import { IRawImbricateConfiguration } from "./raw-definition";

export const parseRawImbricateConfiguration = (
    configuration: IRawImbricateConfiguration,
): IImbricateConfiguration => {

    return {

        presets: typeof configuration.presets === "string"
            ? [configuration.presets]
            : configuration.presets,
    };
};
