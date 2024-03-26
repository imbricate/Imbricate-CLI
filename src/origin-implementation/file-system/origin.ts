/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Origin
 */

import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin } from "../../origin/interface";
import { createOrGetFile } from "./util/io";
import { joinCollectionMetaFilePath } from "./util/path-joiner";

export class FileSystemImbricateOrigin implements IImbricateOrigin {

    public static withBasePath(basePath: string): FileSystemImbricateOrigin {

        return new FileSystemImbricateOrigin(basePath);
    }

    private readonly _basePath: string;

    private constructor(
        basePath: string,
    ) {

        this._basePath = basePath;
    }

    public async createCollection(): Promise<void> {

        const collectionMetaFile = joinCollectionMetaFilePath(this._basePath);
        const collectionMeta = await createOrGetFile(collectionMetaFile, "{}");

        const parsed: Record<string, string> = JSON.parse(collectionMeta);

        console.log(parsed);

        throw new Error("Method not implemented.");
    }

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

        throw new Error("Method not implemented.");
    }

    public async removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }
}
