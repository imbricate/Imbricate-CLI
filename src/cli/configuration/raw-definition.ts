/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Raw Definition
 */

import { ListableValue } from "../../definition/listable";

export interface IImbricateConfigurationOrigin {

}

export interface IRawImbricateConfiguration {

    readonly origins: ListableValue<IImbricateConfigurationOrigin>;
    readonly activeOrigin: string;
}
