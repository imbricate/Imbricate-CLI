/**
 * @author WMXPY
 * @namespace Configuration
 * @description Configuration Manager
 */

import { IImbricateOrigin } from "@imbricate/core";
import { writeTextFile } from "@sudoo/io";
import { CLIOriginIsActive } from "../error/origin/origin-is-active";
import { CLIOriginNotFound } from "../error/origin/origin-not-found";
import { CLIUnknownOriginType } from "../error/origin/unknown-origin-type";
import { CLIProfileAlreadyExists } from "../error/profile/profile-already-exists";
import { CLIProfileNotFound } from "../error/profile/profile-not-found";
import { ITerminalController } from "../terminal/definition";
import { debugLog } from "../util/debug";
import { fixImbricateHomeDirectory, resolveDirectory } from "../util/fix-directory";
import { formatJSON } from "../util/format-json";
import { IImbricateConfiguration, IImbricateConfigurationProfile, ImbricateConfigurationProfilePersistFunction } from "./definition";
import { configurationEditorEchoPreset } from "./editor/presets";
import { IConfigurationManager } from "./interface";
import { readCLIConfiguration } from "./io";
import { ConfigurationProfileManager } from "./profile/profile-manager";
import { IImbricateConfigurationOrigin, IRawImbricateConfiguration } from "./raw-definition";

export class ConfigurationManager implements IConfigurationManager {

    public static async fromHomeConfigurationPath(
        terminalController: ITerminalController,
    ): Promise<ConfigurationManager> {

        const configurationPath: string = fixImbricateHomeDirectory();

        debugLog("Home Configuration Path", configurationPath);

        return await ConfigurationManager.fromConfigurationPath(
            configurationPath,
            terminalController,
        );
    }

    public static async fromConfigurationPath(
        configurationPath: string,
        terminalController: ITerminalController,
    ): Promise<ConfigurationManager> {

        const parsedConfiguration: IImbricateConfiguration = await readCLIConfiguration(configurationPath);

        return new ConfigurationManager(
            configurationPath,
            parsedConfiguration,
            terminalController,
        );
    }

    public static fromConfiguration(
        configurationPath: string,
        configuration: IImbricateConfiguration,
        terminalController: ITerminalController,
    ): ConfigurationManager {

        return new ConfigurationManager(
            configurationPath,
            configuration,
            terminalController,
        );
    }

    private readonly _configurationPath: string;

    private _origins: IImbricateConfigurationOrigin[];
    private _activeOrigin: string | null;

    private _profiles: Record<string, IImbricateConfigurationProfile>;
    private _defaultProfile: string;

    private _originConstructors: Map<
        string,
        (origin: IImbricateConfigurationOrigin) => IImbricateOrigin
    >;

    private readonly _terminalController: ITerminalController;

    private constructor(
        configurationPath: string,
        configuration: IImbricateConfiguration,
        terminalController: ITerminalController,
    ) {

        this._configurationPath = configurationPath;

        this._origins = configuration.origins;
        this._activeOrigin = configuration.activeOrigin;

        this._profiles = configuration.profiles;
        this._defaultProfile = configuration.defaultProfile;

        this._originConstructors = new Map();

        this._terminalController = terminalController;
    }

    public get configurationPath(): string {
        return this._configurationPath;
    }

    public get origins(): IImbricateConfigurationOrigin[] {
        return this._origins;
    }
    public get activeOrigin(): string | null {
        return this._activeOrigin;
    }

    public get profiles(): Record<string, IImbricateConfigurationProfile> {
        return this._profiles;
    }
    public get defaultProfile(): string {
        return this._defaultProfile;
    }

    public setActiveOrigin(origin: string | null): this {

        this._activeOrigin = origin;

        this._persistConfiguration();
        return this;
    }

    public addOrigin(origin: IImbricateConfigurationOrigin): this {

        this._origins.push(origin);

        this._persistConfiguration();
        return this;
    }

    public async deleteOrigin(originName: string): Promise<void> {

        if (this._activeOrigin === originName) {
            throw CLIOriginIsActive.withOriginName(originName);
        }

        this._origins = this._origins.filter((each: IImbricateConfigurationOrigin) => {
            return each.originName !== originName;
        });

        await this._persistConfiguration();
    }

    public updateOrigin(originName: string, origin: IImbricateConfigurationOrigin): this {

        const index: number = this._origins.findIndex((
            each: IImbricateConfigurationOrigin,
        ) => {
            return each.originName === originName;
        });

        if (index === -1) {
            throw CLIOriginNotFound.withOriginName(originName);
        }

        this._origins[index] = origin;

        this._persistConfiguration();
        return this;
    }

    public registerOriginConstructor(
        type: string,
        constructor: (origin: IImbricateConfigurationOrigin) => IImbricateOrigin,
    ): this {

        this._originConstructors.set(type, constructor);
        return this;
    }

    public reconstructOrigin(
        type: string,
        origin: IImbricateConfigurationOrigin,
    ): IImbricateOrigin {

        const constructor: ((origin: IImbricateConfigurationOrigin) => IImbricateOrigin)
            | undefined = this._originConstructors.get(type);

        if (!constructor) {
            throw CLIUnknownOriginType.withOriginName(type);
        }

        return constructor(origin);
    }

    public getDefaultProfile(): ConfigurationProfileManager | null {

        if (!this._profiles[this._defaultProfile]) {
            return null;
        }

        const persistProfile: ImbricateConfigurationProfilePersistFunction = async (
            newProfile: IImbricateConfigurationProfile,
        ) => {

            this._profiles[this._defaultProfile] = newProfile;
            await this._persistConfiguration();
        };

        return ConfigurationProfileManager.create(
            this._profiles[this._defaultProfile],
            persistProfile,
        );
    }

    public setDefaultProfile(profileName: string): Promise<void> {

        if (!this._profiles[profileName]) {
            throw CLIProfileNotFound.withProfileName(profileName);
        }

        this._defaultProfile = profileName;
        return this._persistConfiguration();
    }

    public async addProfile(profileName: string): Promise<ConfigurationProfileManager> {

        if (this._profiles[profileName]) {
            throw CLIProfileAlreadyExists.withProfileName(profileName);
        }

        const persistProfile: ImbricateConfigurationProfilePersistFunction = async (
            newProfile: IImbricateConfigurationProfile,
        ) => {

            this._profiles[profileName] = newProfile;
            await this._persistConfiguration();
        };

        await persistProfile({
            ...configurationEditorEchoPreset,
        });

        return ConfigurationProfileManager.create(
            this._profiles[profileName],
            persistProfile,
        );
    }

    public async deleteProfile(profileName: string): Promise<void> {

        if (!this._profiles[profileName]) {
            throw CLIProfileNotFound.withProfileName(profileName);
        }

        this._profiles = Object.keys(this._profiles)
            .filter((key: string) => key !== profileName)
            .reduce((previous: Record<string, IImbricateConfigurationProfile>, current: string) => {
                return {
                    ...previous,
                    [current]: this._profiles[current],
                };
            }, {});

        await this._persistConfiguration();
    }

    public getProfile(profileName: string): ConfigurationProfileManager | null {

        if (!this._profiles[profileName]) {
            return null;
        }

        const persistProfile: ImbricateConfigurationProfilePersistFunction = async (
            newProfile: IImbricateConfigurationProfile,
        ) => {

            this._profiles[profileName] = newProfile;
            await this._persistConfiguration();
        };

        return ConfigurationProfileManager.create(
            this._profiles[profileName],
            persistProfile,
        );
    }

    public buildConfiguration(): IRawImbricateConfiguration {

        return {

            origins: this._origins,
            activeOrigin: this._activeOrigin,

            profiles: this._profiles,
            defaultProfile: this._defaultProfile,
        };
    }

    private async _persistConfiguration(): Promise<void> {

        const configuration: IRawImbricateConfiguration =
            this.buildConfiguration();

        const configurationText: string = formatJSON(configuration);
        const configurationFilePath: string = resolveDirectory(
            this._configurationPath,
            "imbricate.config.json",
        );

        this._terminalController.printInfo("Configuration Updated", configurationFilePath);

        await writeTextFile(configurationFilePath, configurationText);
    }
}
