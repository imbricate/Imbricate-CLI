/**
 * @author WMXPY
 * @namespace Operations
 * @description Call
 */

import { ImbricateConfiguration } from "../schema/configuration/definition";

export type ImbricateCallConfig = {

    readonly configuration: ImbricateConfiguration;
};

export const imbricateCall = async (
    _config: ImbricateCallConfig,
): Promise<string[]> => {

    return [];
};
