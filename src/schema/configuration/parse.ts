/**
 * @author WMXPY
 * @namespace Schema_Configuration
 * @description Parse
 */

import { ImbricateConfiguration, ParsedImbricateConfiguration } from "./definition";

export const parseImbricateConfiguration = (configuration: ImbricateConfiguration): ParsedImbricateConfiguration => {

    return {

        presets: typeof configuration.presets === "string"
            ? [configuration.presets]
            : configuration.presets,
    };
};
