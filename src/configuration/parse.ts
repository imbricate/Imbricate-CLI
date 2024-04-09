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

        editCommand: configuration.editCommand
            ? configuration.editCommand
            : preset.editCommand,
        editHandsFreeCommand: configuration.editHandsFreeCommand
            ? configuration.editHandsFreeCommand
            : preset.editHandsFreeCommand,
        diffCommand: configuration.diffCommand
            ? configuration.diffCommand
            : preset.diffCommand,
    };
};
