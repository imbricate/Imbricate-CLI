/**
 * @author WMXPY
 * @namespace Util
 * @description Global Manager
 */

import { FileSystemImbricateOrigin } from "../origin-implementation/file-system/origin";
import { IImbricateOrigin } from "../origin/interface";

export class GlobalManager {

    public static fromScratch(): GlobalManager {

        return new GlobalManager();
    }

    private _origins: IImbricateOrigin[] = [];

    private _verboseConfiguration: boolean;
    private _workingDirectory: string;

    private constructor() {

        this._origins = [
            FileSystemImbricateOrigin.withBasePath(process.cwd()),
        ];

        this._verboseConfiguration = false;
        this._workingDirectory = process.cwd();
    }

    public get origins(): IImbricateOrigin[] {
        return this._origins;
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
