/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Collection
 */

import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { FileSystemCollectionMetadataCollection } from "./definition/collection";

export class FileSystemImbricateCollection implements IImbricateOriginCollection {

    public static withConfig(
        collection: FileSystemCollectionMetadataCollection,
    ): FileSystemImbricateCollection {

        return new FileSystemImbricateCollection(
            collection.collectionName,
            collection.description,
        );
    }

    public readonly collectionName: string;
    public readonly description?: string;

    private constructor(
        collectionName: string,
        description?: string,
    ) {

        this.collectionName = collectionName;
        this.description = description;
    }

    public findScripts(...onActivities: string[]): Promise<void> {

        console.log(onActivities);

        throw new Error("Method not implemented.");
    }

    public createPage(title: string): Promise<void> {

        console.log(title);

        throw new Error("Method not implemented.");
    }
}
