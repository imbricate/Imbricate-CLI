/**
 * @author WMXPY
 * @namespace CLI_Operations
 * @description Call
 */

import { IImbricateConfiguration } from "../../configuration/definition";

export type ImbricateCallConfig = {

    readonly configuration: IImbricateConfiguration;
};

export const imbricateCall = async (
    _config: ImbricateCallConfig,
): Promise<string[]> => {

    return [];
};
