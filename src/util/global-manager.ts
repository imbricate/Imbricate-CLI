/**
 * @author WMXPY
 * @namespace Util
 * @description Global Manager
 */

export class GlobalManager {

    public static fromScratch(): GlobalManager {

        return new GlobalManager();
    }

    private _verboseConfiguration: boolean;
    private _workingDirectory: string;

    private constructor() {

        this._verboseConfiguration = false;
        this._workingDirectory = process.cwd();
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
