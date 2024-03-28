/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description Common
 */

import { attemptMarkDir } from "@sudoo/io";
import { getScriptsFolderPath, getScriptsMetadataFolderPath } from "../util/path-joiner";

export const SCRIPT_META_FILE_EXTENSION: string = ".meta.json";

export const ensureScriptFolders = async (basePath: string): Promise<void> => {

    const scriptPath: string = getScriptsFolderPath(basePath);

    await attemptMarkDir(scriptPath);

    const scriptMetadataPath: string = getScriptsMetadataFolderPath(basePath);

    await attemptMarkDir(scriptMetadataPath);
};

export const fixMetaScriptFileName = (
    scriptName: string,
    uuid: string,
): string => {

    return `${scriptName}.${uuid}${SCRIPT_META_FILE_EXTENSION}`;
};
