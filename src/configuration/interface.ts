/**
 * @author WMXPY
 * @namespace Configuration
 * @description Interface
 */

import { IImbricateOrigin } from "@imbricate/core";
import { IImbricateConfigurationOrigin, IRawImbricateConfiguration } from "./raw-definition";
import { ConfigurationEditorPreset } from "./editor/presets";

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

    getActiveEditCommand(): string;
    setEditCommand(command: string): Promise<void>;

    getActiveHandsFreeEditCommand(): string;
    setHandsFreeEditCommand(command: string): Promise<void>;

    getActiveDiffCommand(): string;
    setDiffCommand(command: string): Promise<void>;

    setEditPreset(preset: ConfigurationEditorPreset): Promise<void>;

    buildConfiguration(): IRawImbricateConfiguration;
}
