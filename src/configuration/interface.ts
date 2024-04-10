/**
 * @author WMXPY
 * @namespace Configuration
 * @description Interface
 */

import { IImbricateOrigin } from "@imbricate/core";
import { IImbricateConfigurationProfile } from "./definition";
import { ConfigurationProfileManager } from "./profile/profile-manager";
import { IImbricateConfigurationOrigin, IRawImbricateConfiguration } from "./raw-definition";

export interface IConfigurationManager {

    readonly configurationPath: string;

    readonly origins: IImbricateConfigurationOrigin[];
    readonly activeOrigin: string | null;

    readonly profiles: Record<string, IImbricateConfigurationProfile>;
    readonly defaultProfile: string;

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

    getDefaultProfile(): ConfigurationProfileManager | null;
    getProfile(profileName: string): ConfigurationProfileManager | null;

    buildConfiguration(): IRawImbricateConfiguration;
}
