/**
 * @author WMXPY
 * @namespace CLI
 * @description Origin
 * @override Mock 
 */

import { IImbricateFunctionManager, IImbricateOrigin, IImbricateOriginCollection, IImbricateScript, IMBRICATE_DIGEST_ALGORITHM, ImbricateOriginMetadata, ImbricateScriptMetadata, ImbricateScriptQuery, ImbricateScriptQueryConfig, ImbricateScriptSearchResult, ImbricateScriptSnapshot, ImbricateSearchScriptConfig, SandboxExecuteConfig } from "@imbricate/core";
import { MarkedResult } from "@sudoo/marked";
import { MockFunctionManager } from "./function-manager";

export class MockOrigin implements IImbricateOrigin {

    public static create(): MockOrigin {

        return new MockOrigin();
    }

    public metadata: ImbricateOriginMetadata;
    public payloads: Record<string, any>;

    public collections: IImbricateOriginCollection[];

    private constructor() {

        this.metadata = {
            type: "mock",
            digestAlgorithm: IMBRICATE_DIGEST_ALGORITHM.SHA1,
        };
        this.payloads = {};

        this.collections = [];
    }

    public getFunctionManger(): IImbricateFunctionManager {

        return new MockFunctionManager();
    }

    public createCollection(
        _collectionName: string,
        _description?: string | undefined,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public renameCollection(
        _collectionName: string,
        _newCollectionName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public deleteCollection(
        _collectionName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async hasCollection(
        _collectionName: string,
    ): Promise<boolean> {

        return true;
    }

    public getCollection(
        _collectionName: string,
    ): Promise<IImbricateOriginCollection | null> {

        throw new Error("Method not implemented.");
    }

    public includeCollectionInSearch(
        _collectionName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public excludeCollectionInSearch(
        _collectionName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

        return this.collections;
    }

    public removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
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
