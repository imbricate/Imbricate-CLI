/**
 * @author WMXPY
 * @namespace Util
 * @description Global Manager
 */

import { IImbricateOrigin } from "../origin/interface";
import { GlobalManagerOriginResponse } from "./global-manager/definition";

export class GlobalManager {

    public static fromScratch(): GlobalManager {

        return new GlobalManager();
    }

    private _origins: Map<string, IImbricateOrigin>;

    private _verboseConfiguration: boolean;
    private _workingDirectory: string;

    private constructor() {

        this._origins = new Map<string, IImbricateOrigin>();

        this._verboseConfiguration = false;
        this._workingDirectory = process.cwd();
    }

    public get origins(): GlobalManagerOriginResponse[] {

        const response: GlobalManagerOriginResponse[] = [];
        for (const [key, value] of this._origins) {
            response.push({
                originName: key,
                origin: value,
            });
        }
        return response;
    }
    public putOrigin(originName: string, origin: IImbricateOrigin): this {

        this._origins.set(originName, origin);
        return this;
    }

    public get verboseConfiguration(): boolean {
        return this._verboseConfiguration;
    }
    public setVerboseConfiguration(verbose: boolean): this {

        this._verboseConfiguration = verbose;
        return this;
    }

    public get workingDirectory(): string {
        return this._workingDirectory;
    }
    public setWorkingDirectory(directory: string): this {

        this._workingDirectory = directory;
        return this;
    }
}
