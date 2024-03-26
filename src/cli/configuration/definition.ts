/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Definition
 */

import { IImbricateConfigurationOrigin } from "./raw-definition";

export interface IImbricateConfiguration {

    readonly origins: IImbricateConfigurationOrigin[];
}
