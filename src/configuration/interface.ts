/**
 * @author WMXPY
 * @namespace Configuration
 * @description Interface
 */

import { IImbricateOrigin } from "@imbricate/core";
import { IImbricateConfigurationOrigin } from "./raw-definition";

export interface IConfigurationManager {

    readonly configurationPath: string;
    readonly origins: IImbricateConfigurationOrigin[];
    readonly activeOrigin: string | null;

    setActiveOrigin(origin: string | null): this;
    addOrigin(origin: IImbricateConfigurationOrigin): this;
    updateOrigin(originName: string, origin: IImbricateConfigurationOrigin): this;

    registerOriginConstructor(
        type: string,
        constructor: (origin: IImbricateConfigurationOrigin) => IImbricateOrigin,
    ): this;
    reconstructOrigin(
        type: string,
        origin: IImbricateConfigurationOrigin,
    ): IImbricateOrigin;

    getActiveEditingCommand(handsFree: boolean): string;
}
