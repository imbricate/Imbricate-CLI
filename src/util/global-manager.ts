/**
 * @author WMXPY
 * @namespace Util
 * @description Global Manager
 */

import { IImbricateOrigin } from "../origin/interface";

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

    public get origins(): Record<string, IImbricateOrigin> {
        const result: Record<string, IImbricateOrigin> = {};
        for (const [key, value] of this._origins) {
            result[key] = value;
        }
        return result;
    }
    public get originList(): IImbricateOrigin[] {
        const result: IImbricateOrigin[] = [
            ...this._origins.values(),
        ];
        return result;
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
