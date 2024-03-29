/**
 * @author WMXPY
 * @namespace CLI_Global
 * @description Global Manager
 */

import { IImbricateOrigin } from "@imbricate/core";
import { fixCurrentWorkingDirectory } from "../util/fix-directory";
import { GlobalManagerOriginResponse } from "./definition";

export class GlobalManager {

    public static fromScratch(): GlobalManager {

        return new GlobalManager();
    }

    private _activeOrigin: string | null;
    private _origins: Map<string, IImbricateOrigin>;

    private _verboseConfiguration: boolean;
    private _workingDirectory: string;

    private constructor() {

        this._activeOrigin = null;
        this._origins = new Map<string, IImbricateOrigin>();

        this._verboseConfiguration = false;
        this._workingDirectory = fixCurrentWorkingDirectory();
    }

    public get activeOrigin(): string | null {
        return this._activeOrigin;
    }
    public setActiveOrigin(originName: string | null): this {

        this._activeOrigin = originName;
        return this;
    }

    public get origins(): GlobalManagerOriginResponse[] {

        const response: GlobalManagerOriginResponse[] = [];
        for (const [key, value] of this._origins) {
            response.push({
                active: this._activeOrigin === key,
                originName: key,
                origin: value,
            });
        }
        return response;
    }

    public getOrigin(originName: string): IImbricateOrigin | null {

        const origin: IImbricateOrigin | undefined = this._origins.get(originName);
        if (!origin) {
            return null;
        }
        return origin;
    }

    public putOrigin(originName: string, origin: IImbricateOrigin): this {

        this._origins.set(originName, origin);
        return this;
    }

    public findCurrentOrigin(): IImbricateOrigin | null {

        if (!this._activeOrigin) {
            return null;
        }

        const origin: IImbricateOrigin | undefined = this._origins.get(this._activeOrigin);
        if (!origin) {
            return null;
        }
        return origin;
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
