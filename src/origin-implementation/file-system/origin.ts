/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Origin
 */

import { MarkedResult } from "@sudoo/marked";
import { ImbricateScriptMetadata } from "../../definition/script";
import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin, ImbricateOriginMetadata } from "../../origin/interface";
import { SandboxExecuteConfig } from "../../sandbox/definition/config";
import { SandboxFeature } from "../../sandbox/feature/feature";
import { executeSandboxScript } from "../../sandbox/sandbox";
import { FileSystemImbricateCollection } from "./collection";
import { FileSystemCollectionMetadata, FileSystemCollectionMetadataCollection } from "./definition/collection";
import { FileSystemOriginPayload } from "./definition/origin";
import { createFileSystemOriginExecuteFeature } from "./execute/feature";
import { fileSystemOriginCreateScript } from "./script/create-script";
import { fileSystemOriginGetScript } from "./script/get-script";
import { fileSystemOriginHasScript } from "./script/has-script";
import { fileSystemOriginListScripts } from "./script/list-scripts";
import { fileSystemOriginOpenScript } from "./script/open-script";
import { fileSystemOriginRemoveScript } from "./script/remove-script";
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

    public async createScript(scriptName: string): Promise<ImbricateScriptMetadata> {

        return await fileSystemOriginCreateScript(
            this._basePath,
            scriptName,
        );
    }

    public async hasScript(scriptName: string): Promise<boolean> {

        return await fileSystemOriginHasScript(
            this._basePath,
            scriptName,
        );
    }

    public async getScript(scriptIdentifier: string): Promise<string | null> {

        return await fileSystemOriginGetScript(
            this._basePath,
            scriptIdentifier,
        );
    }

    public async openScript(scriptIdentifier: string): Promise<string> {

        return await fileSystemOriginOpenScript(
            this._basePath,
            scriptIdentifier,
            this.payloads,
        );
    }

    public async listScripts(): Promise<ImbricateScriptMetadata[]> {

        return await fileSystemOriginListScripts(
            this._basePath,
        );
    }

    public async removeScript(
        scriptIdentifier: string,
        scriptName: string,
    ): Promise<void> {

        return await fileSystemOriginRemoveScript(
            this._basePath,
            scriptIdentifier,
            scriptName,
        );
    }

    public async executeScript(
        scriptIdentifier: string,
        config: SandboxExecuteConfig,
    ): Promise<MarkedResult | null> {

        const script: string | null = await this.getScript(scriptIdentifier);

        if (!script) {
            return null;
        }

        const features: SandboxFeature[] = createFileSystemOriginExecuteFeature();

        return await executeSandboxScript(
            script,
            features,
            config,
        );
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
