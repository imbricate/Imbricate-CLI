/**
 * @author WMXPY
 * @namespace CLI_Global_GlobalManager
 * @description Definition
 */

import { IImbricateOrigin } from "../../origin/interface";

export type GlobalManagerOriginResponse = {

    readonly active: boolean;
    readonly originName: string;
    readonly origin: IImbricateOrigin;
};
