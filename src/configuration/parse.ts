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

        origins: Array.isArray(configuration.origins)
            ? configuration.origins
            : [configuration.origins],
    };
};
