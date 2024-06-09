/**
 * @author WMXPY
 * @namespace CLI
 * @description Collection Manager
 * @override Mock 
 */

import { IImbricateCollection, IImbricateCollectionManager, ImbricateCollectionManagerBase, ImbricateCollectionManagerCapability } from "@imbricate/core";

export class MockCollectionManager implements IImbricateCollectionManager {

    public static create(): MockCollectionManager {

        return new MockCollectionManager();
    }

    public collectionName: string;
    public description?: string | undefined;

    public collections: IImbricateCollection[];

    private constructor() {

        this.collectionName = "mock";
        this.description = "mock";

        this.collections = [];
    }

    public get uniqueIdentifier(): string {
        return "mock";
    }
    public get capabilities(): ImbricateCollectionManagerCapability {
        return ImbricateCollectionManagerBase.allAllowCapability();
    }

    public createCollection(
        _collectionName: string,
        _description?: string | undefined,
    ): Promise<IImbricateCollection> {

        throw new Error("Method not implemented.");
    }

    public renameCollection(
        _collectionUniqueIdentifier: string,
        _newCollectionName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public deleteCollection(
        _collectionUniqueIdentifier: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async hasCollection(
        _collectionName: string,
    ): Promise<boolean> {

        return true;
    }

    public getCollection(
        _collectionUniqueIdentifier: string,
    ): Promise<IImbricateCollection | null> {

        throw new Error("Method not implemented.");
    }

    public findCollection(
        _collectionName: string,
    ): Promise<IImbricateCollection | null> {

        throw new Error("Method not implemented.");
    }

    public async listCollections(): Promise<IImbricateCollection[]> {

        return this.collections;
    }

    public removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }
}