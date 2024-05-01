/**
 * @author WMXPY
 * @namespace CLI
 * @description Configuration Manager
 * @override Mock
 */

import { IImbricateOrigin } from "@imbricate/core";
import { IImbricateConfiguration, IImbricateConfigurationOrigin, IRawImbricateConfiguration } from "@imbricate/local-fundamental";
import { IConfigurationManager } from "../../src/configuration/interface";
import { ConfigurationProfileManager } from "../../src/configuration/profile/profile-manager";

export class MockConfigurationManager implements IConfigurationManager {

    public static create(
        configurationPath: string,
        configuration: IImbricateConfiguration,
    ): MockConfigurationManager {

        return new MockConfigurationManager(
            configurationPath,
            configuration,
        );
    }

    public configurationPath: string;
    public origins: IImbricateConfigurationOrigin[];
    public activeOrigin: string | null;

    public profiles: Record<string, any>;
    public defaultProfile: string;

    private _mockOrigin: IImbricateOrigin | null = null;

    private constructor(
        configurationPath: string,
        configuration: IImbricateConfiguration,
    ) {

        this.configurationPath = configurationPath;
        this.origins = configuration.origins;
        this.activeOrigin = configuration.activeOrigin;

        this.profiles = configuration.profiles;
        this.defaultProfile = configuration.defaultProfile;
    }

    public getDefaultProfile(): ConfigurationProfileManager | null {
        throw new Error("Method not implemented.");
    }

    public setDefaultProfile(_profileName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public addProfile(_profileName: string): Promise<ConfigurationProfileManager> {
        throw new Error("Method not implemented.");
    }

    public deleteProfile(_profileName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public getProfile(_profileName: string): ConfigurationProfileManager | null {
        throw new Error("Method not implemented.");
    }

    public setActiveOrigin(_origin: string | null): this {

        throw new Error("Method not implemented.");
    }

    public addOrigin(_origin: IImbricateConfigurationOrigin): this {

        throw new Error("Method not implemented.");
    }

    public updateOrigin(_originName: string, _origin: IImbricateConfigurationOrigin): this {

        throw new Error("Method not implemented.");
    }

    public deleteOrigin(_originName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public getActiveEditingCommand(
        _handsFree: boolean,
    ): string {

        throw new Error("Method not implemented.");
    }

    public registerOriginConstructor(
        _type: string,
        _constructor: (origin: IImbricateConfigurationOrigin) => any,
    ): this {

        throw new Error("Method not implemented.");
    }

    public reconstructOrigin(
        _type: string,
        _origin: IImbricateConfigurationOrigin,
    ): any {

        if (this._mockOrigin) {
            return this._mockOrigin;
        }

        throw new Error("Method not implemented.");
    }

    public assignMockOrigin(origin: IImbricateOrigin): this {

        this._mockOrigin = origin;
        return this;
    }

    public buildConfiguration(): IRawImbricateConfiguration {

        return {
            origins: this.origins,
            activeOrigin: this.activeOrigin,
            profiles: this.profiles,
            defaultProfile: this.defaultProfile,
        };
    }
}
