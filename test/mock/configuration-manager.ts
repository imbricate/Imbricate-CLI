/**
 * @author WMXPY
 * @namespace CLI
 * @description Configuration Manager
 * @override Mock
 */

import { IImbricateConfiguration } from "../../src/cli/configuration/definition";
import { IConfigurationManager } from "../../src/cli/configuration/interface";
import { IImbricateConfigurationOrigin } from "../../src/cli/configuration/raw-definition";

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

    private constructor(
        configurationPath: string,
        configuration: IImbricateConfiguration,
    ) {

        this.configurationPath = configurationPath;
        this.origins = configuration.origins;
        this.activeOrigin = configuration.activeOrigin;
    }

    public setActiveOrigin(_origin: string | null): this {

        throw new Error("Method not implemented.");
    }

    public addOrigin(_origin: IImbricateConfigurationOrigin): this {

        throw new Error("Method not implemented.");
    }
}
