/**
 * @author WMXPY
 * @namespace CLI
 * @description Script Manager
 * @override Mock 
 */

import { IImbricateScript, IImbricateScriptManager, ImbricateScriptManagerBase, ImbricateScriptManagerCapability, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateScriptSnapshot, ImbricateSearchScriptConfig, SandboxExecuteConfig } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";

export class MockScriptManager implements IImbricateScriptManager {

    public static create(): MockScriptManager {

        return new MockScriptManager();
    }

    public collectionName: string;
    public description?: string | undefined;

    private constructor() {

        this.collectionName = "mock";
        this.description = "mock";
    }

    public get uniqueIdentifier(): string {
        return "mock";
    }
    public get capabilities(): ImbricateScriptManagerCapability {
        return ImbricateScriptManagerBase.allAllowCapability();
    }

    public createScript(
        _scriptName: string,
        _description?: string | undefined,
    ): Promise<IImbricateScript> {

        throw new Error("Method not implemented.");
    }

    public hasScript(
        _scriptName: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }

    public getScript(
        _scriptName: string,
    ): Promise<IImbricateScript | null> {

        throw new Error("Method not implemented.");
    }

    public openScript(
        _scriptIdentifier: string,
    ): Promise<string> {

        throw new Error("Method not implemented.");
    }

    public listScripts(): Promise<ImbricateScriptSnapshot[]> {

        throw new Error("Method not implemented.");
    }

    public deleteScript(
        _scriptName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public putScript(
        _scriptMetadata: ImbricateScriptMetadata,
        _script: string,
    ): Promise<IImbricateScript> {
        throw new Error("Method not implemented.");
    }

    public renameScript(
        _identifier: string,
        _newScriptName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public searchScripts(
        _keyword: string,
        _config: ImbricateSearchScriptConfig,
    ): Promise<ImbricateScriptSearchResult[]> {

        throw new Error("Method not implemented.");
    }

    public queryScripts(
        _query: ImbricateScriptQuery,
        _config: ImbricateScriptQueryConfig,
    ): Promise<IImbricateScript[]> {

        throw new Error("Method not implemented.");
    }

    public async executeScript(
        _scriptIdentifier: string,
        _config: SandboxExecuteConfig,
    ): Promise<MarkedResult | null> {

        throw new Error("Method not implemented.");
    }
}