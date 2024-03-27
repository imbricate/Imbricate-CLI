/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Interface
 */

import { IImbricateOrigin } from "../../origin/interface";
import { IImbricateConfigurationOrigin } from "./raw-definition";

export interface IConfigurationManager {

    readonly configurationPath: string;
    readonly origins: IImbricateConfigurationOrigin[];
    readonly activeOrigin: string | null;

    setActiveOrigin(origin: string | null): this;
    addOrigin(origin: IImbricateConfigurationOrigin): this;

    registerOriginConstructor(
        type: string,
        constructor: (origin: IImbricateConfigurationOrigin) => IImbricateOrigin,
    ): this;
    reconstructOrigin(
        type: string,
        origin: IImbricateConfigurationOrigin,
    ): IImbricateOrigin;
}
