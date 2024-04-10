/**
 * @author WMXPY
 * @namespace Configuration
 * @description Parse
 */

import { IImbricateConfiguration } from "./definition";
import { ConfigurationEditorPreset, configurationEditorEchoPreset } from "./editor/presets";
import { IRawImbricateConfiguration } from "./raw-definition";

export const parseRawImbricateConfiguration = (
    configuration: Partial<IRawImbricateConfiguration>,
): IImbricateConfiguration => {

    const preset: ConfigurationEditorPreset = configurationEditorEchoPreset;

    return {

        origins: configuration.origins
            ? Array.isArray(configuration.origins)
                ? configuration.origins
                : [configuration.origins]
            : [],
        activeOrigin: configuration.activeOrigin
            ? configuration.activeOrigin
            : null,

        profiles: configuration.profiles ?? {
            "$default-fallback": {
                editCommand: preset.editCommand,
                editHandsFreeCommand: preset.editHandsFreeCommand,
                diffCommand: preset.diffCommand,
            },
        },
        defaultProfile: configuration.defaultProfile
            ? configuration.defaultProfile
            : "$default-fallback",
    };
};
