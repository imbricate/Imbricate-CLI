/**
 * @author WMXPY
 * @namespace Global
 * @description Global Manager
 */

import { IImbricateOrigin } from "@imbricate/core";
import { ImbricateOriginManager } from "@imbricate/local-fundamental";
import { fixCurrentWorkingDirectory } from "../util/fix-directory";

export class GlobalManager {

    public static fromScratch(): GlobalManager {

        return new GlobalManager();
    }

    private _activeOrigin: string | null;
    private _originManager: ImbricateOriginManager;

    private _profileName: string | null;

    private _verboseConfiguration: boolean;
    private _workingDirectory: string;

    private constructor() {

        this._activeOrigin = null;
        this._originManager = ImbricateOriginManager.fromScratch();

        this._profileName = null;

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

    public get originManager(): ImbricateOriginManager {
        return this._originManager;
    }

    public get profileName(): string | null {
        return this._profileName;
    }
    public setProfileName(profileName: string | null): this {

        this._profileName = profileName;
        return this;
    }

    public findCurrentOrigin(): IImbricateOrigin | null {

        if (!this._activeOrigin) {
            return null;
        }

        const origin: IImbricateOrigin | null = this._originManager.getOrigin(this._activeOrigin);
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
