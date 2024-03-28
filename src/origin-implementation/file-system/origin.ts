/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Origin
 */

import { ImbricateScriptMetadata } from "../../definition/script";
import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin, ImbricateOriginMetadata } from "../../origin/interface";
import { FileSystemImbricateCollection } from "./collection";
import { FileSystemCollectionMetadata, FileSystemCollectionMetadataCollection } from "./definition/collection";
import { FileSystemOriginPayload } from "./definition/origin";
import { fileSystemOriginCreateScript } from "./script/create-script";
import { fileSystemOriginHasScript } from "./script/has-script";
import { fileSystemOriginListScripts } from "./script/list-scripts";
import { createOrGetFile, putFile } from "./util/io";
import { joinCollectionMetaFilePath } from "./util/path-joiner";

export class FileSystemImbricateOrigin implements IImbricateOrigin {

    public static withPayloads(
        payload: FileSystemOriginPayload,
    ): FileSystemImbricateOrigin {

        return new FileSystemImbricateOrigin(
            payload,
        );
    }

    public readonly metadata: ImbricateOriginMetadata = {
        type: "file-system",
    };
    public readonly payloads: FileSystemOriginPayload;

    private readonly _basePath: string;

    private constructor(
        payload: FileSystemOriginPayload,
    ) {

        this._basePath = payload.basePath;
        this.payloads = payload;
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

    public async getCollection(collectionName: string): Promise<IImbricateOriginCollection | null> {

        const collectionsMetaData: FileSystemCollectionMetadata =
            await this._getCollectionsMetaData();

        const found: FileSystemCollectionMetadataCollection | undefined =
            collectionsMetaData.collections.find((
                collection: FileSystemCollectionMetadataCollection,
            ) => {
                return collection.collectionName === collectionName;
            });

        if (!found) {
            return null;
        }

        const instance: FileSystemImbricateCollection =
            FileSystemImbricateCollection.withConfig(
                this._basePath,
                this.payloads,
                found,
            );

        return instance;
    }

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

        const collectionsMetaData: FileSystemCollectionMetadata =
            await this._getCollectionsMetaData();

        return collectionsMetaData.collections.map((
            collection: FileSystemCollectionMetadataCollection,
        ) => {

            const instance: FileSystemImbricateCollection =
                FileSystemImbricateCollection.withConfig(
                    this._basePath,
                    this.payloads,
                    collection,
                );

            return instance;
        });
    }

    public async removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async createScript(_scriptName: string): Promise<ImbricateScriptMetadata> {

        return await fileSystemOriginCreateScript(
            this._basePath,
            _scriptName,
        );
    }

    public async hasScript(scriptName: string): Promise<boolean> {

        return await fileSystemOriginHasScript(
            this._basePath,
            scriptName,
        );
    }

    public async getScript(_scriptName: string): Promise<string | null> {

        throw new Error("Method not implemented.");
    }

    public async openScript(_scriptName: string): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async listScripts(): Promise<ImbricateScriptMetadata[]> {

        return await fileSystemOriginListScripts(
            this._basePath,
        );
    }

    public async removeScript(_scriptName: string): Promise<void> {

        throw new Error("Method not implemented.");
    }

    private async _getCollectionsMetaData(): Promise<FileSystemCollectionMetadata> {

        const collectionMetaFile = joinCollectionMetaFilePath(this._basePath);
        const collectionMeta = await createOrGetFile(
            collectionMetaFile, JSON.stringify(
                {
                    collections: [],
                } satisfies FileSystemCollectionMetadata,
            ),
        );

        const parsed: FileSystemCollectionMetadata = JSON.parse(collectionMeta);

        return parsed;
    }

    private async _putCollectionsMetaData(metaData: FileSystemCollectionMetadata): Promise<void> {

        const collectionMetaFile = joinCollectionMetaFilePath(this._basePath);

        await putFile(collectionMetaFile, JSON.stringify(metaData, null, 2));
    }
}
