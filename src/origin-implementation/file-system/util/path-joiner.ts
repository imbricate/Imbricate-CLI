/**
 * @author WMXPY
 * @namespace FileSystem_Util
 * @description Path Joiner
 */

import * as Path from "path";

export const joinCollectionMetaFilePath =
    (basePath: string): string => {

        return Path.join(basePath, "collection.meta.json");
    };

export const joinCollectionFolderPath =
    (basePath: string, collectionName: string): string => {

        return Path.join(basePath, "collections", collectionName);
    };

export const joinCollectionFolderListFilePath =
    (basePath: string, collectionName: string): string => {

        return Path.join(basePath, "collections", collectionName, "list.meta.json");
    };
