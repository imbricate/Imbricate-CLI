/**
 * @author WMXPY
 * @namespace CLI
 * @description Origin
 * @override Mock 
 */

import { IImbricateOrigin, IImbricateOriginCollection, ImbricateOriginMetadata, ImbricateScriptMetadata } from "@imbricate/core";
import { SandboxExecuteConfig } from "@imbricate/core/sandbox/definition/config";
import { MarkedResult } from "@sudoo/marked";

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
        };
        this.payloads = {};

        this.collections = [];
    }

    public createCollection(
        _collectionName: string,
        _description?: string | undefined,
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

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

        return this.collections;
    }

    public removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public createScript(
        _scriptName: string,
        _description?: string | undefined,
    ): Promise<ImbricateScriptMetadata> {

        throw new Error("Method not implemented.");
    }

    public hasScript(
        _scriptName: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }

    public getScript(
        _scriptName: string,
    ): Promise<string | null> {

        throw new Error("Method not implemented.");
    }

    public openScript(
        _scriptIdentifier: string,
    ): Promise<string> {

        throw new Error("Method not implemented.");
    }

    public listScripts(): Promise<ImbricateScriptMetadata[]> {

        throw new Error("Method not implemented.");
    }

    public removeScript(
        _scriptName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async executeScript(
        _scriptIdentifier: string,
        _config: SandboxExecuteConfig,
    ): Promise<MarkedResult | null> {

        throw new Error("Method not implemented.");
    }
}
