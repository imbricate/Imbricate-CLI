/**
 * @author WMXPY
 * @namespace FileSystem_Util
 * @description Path Joiner
 */

import * as Path from "path";

export const joinCollectionMetaFilePath = (
    basePath: string,
): string => {

    return Path.join(basePath, "collection.meta.json");
};

export const getCollectionFolderPath = (
    basePath: string,
): string => {

    return Path.join(basePath, "collections");
};

export const getScriptsFolderPath = (
    basePath: string,
    ...paths: string[]
): string => {

    return Path.join(basePath, "scripts", ...paths);
};

export const getScriptsMetadataFolderPath = (
    basePath: string,
    ...paths: string[]
): string => {

    return Path.join(basePath, "scripts", ".metadata", ...paths);
};

export const joinCollectionFolderPath = (
    basePath: string,
    collectionName: string,
    ...paths: string[]
): string => {

    const fixedCollectionName: string = collectionName
        .replace(/\//g, "-")
        .replace(/\\/g, "-")
        .replace(/:/g, "-")
        .replace(/ /g, "-");

    return Path.join(basePath, "collections", fixedCollectionName, ...paths);
};

export const joinCollectionFolderListFilePath = (
    basePath: string,
    collectionName: string,
): string => {

    return Path.join(basePath, "collections", collectionName, "list.meta.json");
};
