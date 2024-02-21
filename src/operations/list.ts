/**
 * @author WMXPY
 * @namespace Operations
 * @description List
 */

import { IImbricateConfiguration } from "../configuration/definition";

export type ImbricateListConfig = {

    readonly configuration: IImbricateConfiguration;
};

export const imbricateList = async (
    _config: ImbricateListConfig,
): Promise<string[]> => {

    return [];
};
