/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Origin
 */

import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin, ImbricateOriginMetadata } from "../../origin/interface";
import { FileSystemImbricateCollection } from "./collection";
import { FileSystemCollectionMetadata, FileSystemCollectionMetadataCollection } from "./definition/collection";
import { createOrGetFile, putFile } from "./util/io";
import { joinCollectionMetaFilePath } from "./util/path-joiner";

export class FileSystemImbricateOrigin implements IImbricateOrigin {

    public static withBasePath(basePath: string): FileSystemImbricateOrigin {

        return new FileSystemImbricateOrigin(basePath);
    }

    public readonly metadata: ImbricateOriginMetadata = {
        type: "file-system",
    };
    public readonly payloads: Record<string, any>;

    private readonly _basePath: string;

    private constructor(
        basePath: string,
    ) {

        this._basePath = basePath;
        this.payloads = {
            basePath,
        };
    }

    public async createCollection(collectionName: string): Promise<void> {

        const collectionsMetaData: FileSystemCollectionMetadata =
            await this._getCollectionsMetaData();

        const newMetaData: FileSystemCollectionMetadata = {
            collections: [
                ...collectionsMetaData.collections,
                {
                    collectionName,
                },
            ],
        };

        console.log(newMetaData);
        await this._putCollectionsMetaData(newMetaData);
    }

    public async hasCollection(collectionName: string): Promise<boolean> {

        const collectionsMetaData: FileSystemCollectionMetadata =
            await this._getCollectionsMetaData();

        const found: boolean = collectionsMetaData.collections.some((
            collection: FileSystemCollectionMetadataCollection,
        ) => {
            return collection.collectionName === collectionName;
        });
        return found;
    }

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

        const collectionsMetaData: FileSystemCollectionMetadata =
            await this._getCollectionsMetaData();

        return collectionsMetaData.collections.map((
            collection: FileSystemCollectionMetadataCollection,
        ) => {

            const instance: FileSystemImbricateCollection =
                FileSystemImbricateCollection.withConfig(collection);

            return instance;
        });
    }

    public async removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }

    private async _getCollectionsMetaData(): Promise<FileSystemCollectionMetadata> {

        const collectionMetaFile = joinCollectionMetaFilePath(this._basePath);
        const collectionMeta = await createOrGetFile(collectionMetaFile, JSON.stringify(
            {
                collections: [],
            } satisfies FileSystemCollectionMetadata,
        ));

        const parsed: FileSystemCollectionMetadata = JSON.parse(collectionMeta);

        return parsed;
    }

    private async _putCollectionsMetaData(metaData: FileSystemCollectionMetadata): Promise<void> {

        const collectionMetaFile = joinCollectionMetaFilePath(this._basePath);
        await putFile(collectionMetaFile, JSON.stringify(metaData, null, 2));
    }
}
