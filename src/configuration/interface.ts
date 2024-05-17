/**
 * @author WMXPY
 * @namespace Configuration
 * @description Interface
 */

import { IImbricateOrigin } from "@imbricate/core";
import { IImbricateConfigurationOrigin, IImbricateConfigurationProfile, IRawImbricateConfiguration } from "@imbricate/local-fundamental";
import { ConfigurationProfileManager } from "./profile/profile-manager";

export interface IConfigurationManager {

    readonly configurationPath: string;

    readonly origins: IImbricateConfigurationOrigin[];
    readonly activeOrigin: string | null;

    readonly profiles: Record<string, IImbricateConfigurationProfile>;
    readonly defaultProfile: string;

    setActiveOrigin(origin: string | null): this;

    addOrigin(origin: IImbricateConfigurationOrigin): this;
    deleteOrigin(originName: string): Promise<void>;

    updateOrigin(originName: string, origin: IImbricateConfigurationOrigin): this;

    registerOriginConstructor(
        type: string,
        constructor: (origin: IImbricateConfigurationOrigin) => Promise<IImbricateOrigin>,
    ): this;
    reconstructOrigin(
        type: string,
        origin: IImbricateConfigurationOrigin,
    ): Promise<IImbricateOrigin>;

    getDefaultProfile(): ConfigurationProfileManager | null;
    setDefaultProfile(profileName: string): Promise<void>;

    addProfile(profileName: string): Promise<ConfigurationProfileManager>;
    deleteProfile(profileName: string): Promise<void>;
    getProfile(profileName: string): ConfigurationProfileManager | null;

    buildConfiguration(): IRawImbricateConfiguration;
}
