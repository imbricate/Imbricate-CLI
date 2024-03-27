/**
 * @author WMXPY
 * @namespace CLI
 * @description Origin
 * @override Mock 
 */

import { IImbricateOriginCollection } from "../../src/origin/collection/interface";
import { IImbricateOrigin, ImbricateOriginMetadata } from "../../src/origin/interface";

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
}
