/**
 * @author WMXPY
 * @namespace Schema_Configuration
 * @description Parse
 */

import { ImbricateConfiguration, RawImbricateConfiguration } from "./definition";

export const parseImbricateConfiguration = (configuration: RawImbricateConfiguration): ImbricateConfiguration => {

    return {

        presets: typeof configuration.presets === "string"
            ? [configuration.presets]
            : configuration.presets,
    };
};
