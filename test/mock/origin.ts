/**
 * @author WMXPY
 * @namespace CLI
 * @description Origin
 * @override Mock 
 */

import { IImbricateBinaryStorage, IImbricateFunctionManager, IImbricateOrigin, IImbricateScriptManager, IMBRICATE_DIGEST_ALGORITHM, ImbricateOriginBase, ImbricateOriginCapability, ImbricateOriginMetadata } from "@imbricate/core";
import { MockCollectionManager } from "./collection-manager";
import { MockFunctionManager } from "./function-manager";
import { MockScriptManager } from "./script-manager";

export class MockOrigin implements IImbricateOrigin {

    public static create(): MockOrigin {

        return new MockOrigin();
    }

    public metadata: ImbricateOriginMetadata;
    public payloads: Record<string, any>;

    private readonly _collectionManager: MockCollectionManager =
        MockCollectionManager.create();

    private constructor() {

        this.metadata = {
            digestAlgorithm: IMBRICATE_DIGEST_ALGORITHM.SHA1,
        };
        this.payloads = {};
    }

    public get originType(): string {
        return "mock";
    }
    public get uniqueIdentifier(): string {
        return "mock";
    }

    public get capabilities(): ImbricateOriginCapability {

        return ImbricateOriginBase.allAllowCapability();
    }

    public getFunctionManager(): IImbricateFunctionManager {

        return new MockFunctionManager();
    }

    public getBinaryStorage(): IImbricateBinaryStorage {

        throw new Error("Method not implemented.");
    }

    public getScriptManager(): IImbricateScriptManager {

        return MockScriptManager.create();
    }

    public getCollectionManager(): MockCollectionManager {

        return this._collectionManager;
    }

    public async dispose(): Promise<void> {
        return;
    }
}
