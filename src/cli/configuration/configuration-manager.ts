/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Configuration Manager
 */

import { writeTextFile } from "@sudoo/io";
import { ITerminalController } from "../terminal/definition";
import { debugLog } from "../util/debug";
import { fixHomeDirectory, resolveDirectory } from "../util/fix-directory";
import { IImbricateConfiguration } from "./definition";
import { IConfigurationManager } from "./interface";
import { readCLIConfiguration } from "./io";
import { IImbricateConfigurationOrigin, IRawImbricateConfiguration } from "./raw-definition";

export class ConfigurationManager implements IConfigurationManager {

    public static async fromHomeConfigurationPath(
        terminalController: ITerminalController,
    ): Promise<ConfigurationManager> {

        const configurationPath: string = fixHomeDirectory(".imbricate");

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

    private readonly _terminalController: ITerminalController;

    private constructor(
        configurationPath: string,
        configuration: IImbricateConfiguration,
        terminalController: ITerminalController,
    ) {

        this._configurationPath = configurationPath;

        this._origins = configuration.origins;
        this._activeOrigin = configuration.activeOrigin;

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

    private async _persistConfiguration(): Promise<void> {

        const configuration: IRawImbricateConfiguration = {
            origins: this._origins,
            activeOrigin: this._activeOrigin,
        };

        const configurationText: string = JSON.stringify(configuration, null, 2);
        const configurationFilePath: string = resolveDirectory(
            this._configurationPath,
            "imbricate.config.json",
        );

        this._terminalController.printInfo("Configuration Updated", configurationFilePath);

        await writeTextFile(configurationFilePath, configurationText);
    }
}
