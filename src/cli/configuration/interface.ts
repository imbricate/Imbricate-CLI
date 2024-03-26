/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Interface
 */

import { IImbricateConfigurationOrigin } from "./raw-definition";

export interface IConfigurationManager {

    readonly configurationPath: string;
    readonly origins: IImbricateConfigurationOrigin[];
    readonly activeOrigin: string | null;

    setActiveOrigin(origin: string | null): this;
    addOrigin(origin: IImbricateConfigurationOrigin): this;
}
