/**
 * @author WMXPY
 * @namespace Operations
 * @description Serve
 */

import { IImbricateConfiguration } from "../configuration/definition";

export type ImbricateServeConfig = {

    readonly configuration: IImbricateConfiguration;
};

export const imbricateServe = async (
    _config: ImbricateServeConfig,
): Promise<string[]> => {

    return [];
};
