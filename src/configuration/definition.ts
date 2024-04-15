/**
 * @author WMXPY
 * @namespace Configuration
 * @description Definition
 */

import { IImbricateConfigurationOrigin } from "./raw-definition";

export interface IImbricateConfiguration {

    readonly origins: IImbricateConfigurationOrigin[];
    readonly activeOrigin: string | null;

    readonly profiles: Record<string, IImbricateConfigurationProfile>;
    readonly defaultProfile: string;
}

export interface IImbricateConfigurationProfile {

    readonly editCommand: string[];
    readonly editHandsFreeCommand: string[];
    readonly diffCommand: string[];
}

export type ImbricateConfigurationProfilePersistFunction = (
    newProfile: IImbricateConfigurationProfile,
) => Promise<void>;
