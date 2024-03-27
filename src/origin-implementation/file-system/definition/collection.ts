/**
 * @author WMXPY
 * @namespace FileSystem_Definition
 * @description Collection
 */

export type FileSystemCollectionMetadataCollection = {

    readonly collectionName: string;
    readonly description?: string;
};

export type FileSystemCollectionMetadata = {

    readonly collections: FileSystemCollectionMetadataCollection[];
};
