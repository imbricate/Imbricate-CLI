/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Configuration Manager
 */

import { readTextFile } from "@sudoo/io";
import { fixHomeDirectory, resolveDirectory } from "../util/fix-directory";
import { IImbricateConfiguration } from "./definition";
import { parseRawImbricateConfiguration } from "./parse";
import { IImbricateConfigurationOrigin, IRawImbricateConfiguration } from "./raw-definition";

export class ConfigurationManager {

    public static async fromHomeConfigurationPath(): Promise<ConfigurationManager> {

        const configurationPath: string = fixHomeDirectory(".imbricate");
        return await ConfigurationManager.fromConfigurationPath(configurationPath);
    }

    public static async fromConfigurationPath(
        configurationPath: string,
    ): Promise<ConfigurationManager> {

        const configurationFilePath: string = resolveDirectory(
            configurationPath,
            "imbricate.config.json",
        );

        const configurationText: string = await readTextFile(configurationFilePath);

        const configuration: IRawImbricateConfiguration = JSON.parse(configurationText);
        const parsedConfiguration: IImbricateConfiguration = parseRawImbricateConfiguration(configuration);

        return new ConfigurationManager(
            configurationPath,
            parsedConfiguration,
        );
    }

    public static fromConfiguration(
        configurationPath: string,
        configuration: IImbricateConfiguration,
    ): ConfigurationManager {

        return new ConfigurationManager(
            configurationPath,
            configuration,
        );
    }

    private readonly _configurationPath: string;

    private _origins: IImbricateConfigurationOrigin[];
    private _activeOrigin: string | null;

    private constructor(
        configurationPath: string,
        configuration: IImbricateConfiguration,
    ) {

        this._configurationPath = configurationPath;

        this._origins = configuration.origins;
        this._activeOrigin = configuration.activeOrigin;
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
}
