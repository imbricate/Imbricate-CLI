/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Raw Definition
 */

import { ListableValue } from "../../definition/listable";

export interface IImbricateConfigurationOrigin {

    readonly originName: string;

    readonly type: string;
    readonly payloads: Record<string, any>;
}

export interface IRawImbricateConfiguration {

    readonly origins: ListableValue<IImbricateConfigurationOrigin>;
    readonly activeOrigin?: string | null;
}
