/**
 * @author WMXPY
 * @namespace Operations
 * @description Serve
 */

import { ImbricateConfiguration } from "../configuration/definition";

export type ImbricateServeConfig = {

    readonly configuration: ImbricateConfiguration;
};

export const imbricateServe = async (
    _config: ImbricateServeConfig,
): Promise<string[]> => {

    return [];
};
