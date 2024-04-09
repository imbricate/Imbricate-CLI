/**
 * @author WMXPY
 * @namespace Configuration
 * @description Definition
 */

import { IImbricateConfigurationOrigin } from "./raw-definition";

export interface IImbricateConfiguration {

    readonly origins: IImbricateConfigurationOrigin[];
    readonly activeOrigin: string | null;

    readonly editCommand: string;
    readonly editHandsFreeCommand: string;
    readonly diffCommand: string;
}
