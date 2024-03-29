/**
 * @author WMXPY
 * @namespace Configuration
 * @description Raw Definition
 */

import { ListableValue } from "@imbricate/core";

export interface IImbricateConfigurationOrigin {

    readonly originName: string;

    readonly type: string;
    readonly payloads: Record<string, any>;
}

export interface IRawImbricateConfiguration {

    readonly origins: ListableValue<IImbricateConfigurationOrigin>;
    readonly activeOrigin?: string | null;
}

export const getDefaultRawImbricateConfiguration = (): IRawImbricateConfiguration => {

    return {
        origins: [],
    };
};
