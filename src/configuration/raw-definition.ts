/**
 * @author WMXPY
 * @namespace Configuration
 * @description Raw Definition
 */

import { ListableValue } from "@imbricate/core";
import { ConfigurationEditorPreset, configurationEditorVscodeNewWindowPreset } from "./editor/presets";

export interface IImbricateConfigurationOrigin {

    readonly originName: string;

    readonly type: string;
    readonly payloads: Record<string, any>;
}

export interface IRawImbricateConfiguration {

    readonly origins: ListableValue<IImbricateConfigurationOrigin>;
    readonly activeOrigin: string | null;

    readonly editCommand: string;
    readonly editHandsFreeCommand: string;
    readonly diffCommand: string;
}

export const getDefaultRawImbricateConfiguration = (): IRawImbricateConfiguration => {

    const vscodeNewWindowPreset: ConfigurationEditorPreset =
        configurationEditorVscodeNewWindowPreset;

    return {

        origins: [],
        activeOrigin: null,

        editCommand: vscodeNewWindowPreset.editCommand,
        editHandsFreeCommand: vscodeNewWindowPreset.editHandsFreeCommand,
        diffCommand: vscodeNewWindowPreset.diffCommand,
    };
};
