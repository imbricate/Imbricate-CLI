/**
 * @author WMXPY
 * @namespace Configuration_Profile
 * @description Profile Manager
 */

import { IImbricateConfigurationProfile, ImbricateConfigurationProfilePersistFunction } from "../definition";
import { ConfigurationEditorPreset } from "../editor/presets";

export class ConfigurationProfileManager {

    public static create(
        profile: IImbricateConfigurationProfile,
        persistProfileFunction: ImbricateConfigurationProfilePersistFunction,
    ): ConfigurationProfileManager {

        return new ConfigurationProfileManager(
            profile,
            persistProfileFunction,
        );
    }

    private readonly _profile: IImbricateConfigurationProfile;
    private readonly _persistProfileFunction: ImbricateConfigurationProfilePersistFunction;

    private constructor(
        profile: IImbricateConfigurationProfile,
        persistProfileFunction: ImbricateConfigurationProfilePersistFunction,
    ) {

        this._profile = profile;
        this._persistProfileFunction = persistProfileFunction;
    }

    public getActiveEditCommand(): string[] {

        return this._profile.editCommand;
    }

    public async setEditCommand(
        commands: string[],
    ): Promise<void> {

        const newProfile: IImbricateConfigurationProfile = {
            ...this._profile,
            editCommand: commands,
        };
        await this._persistProfileFunction(newProfile);
    }

    public getActiveHandsFreeEditCommand(): string[] {

        return this._profile.editHandsFreeCommand;
    }

    public async setHandsFreeEditCommand(
        commands: string[],
    ): Promise<void> {

        const newProfile: IImbricateConfigurationProfile = {
            ...this._profile,
            editHandsFreeCommand: commands,
        };
        await this._persistProfileFunction(newProfile);
    }

    public getActiveDiffCommand(): string[] {

        return this._profile.diffCommand;
    }

    public async setDiffCommand(
        commands: string[],
    ): Promise<void> {

        const newProfile: IImbricateConfigurationProfile = {
            ...this._profile,
            diffCommand: commands,
        };
        await this._persistProfileFunction(newProfile);
    }

    public async setEditPreset(
        preset: ConfigurationEditorPreset,
    ): Promise<void> {

        const newProfile: IImbricateConfigurationProfile = {
            editCommand: preset.editCommand,
            editHandsFreeCommand: preset.editHandsFreeCommand,
            diffCommand: preset.diffCommand,
        };
        await this._persistProfileFunction(newProfile);
    }
}
