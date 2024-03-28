/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description List Scripts
 */

import { directoryFiles } from "@sudoo/io";
import { ImbricateScriptMetadata } from "../../../definition/script";
import { getScriptsMetadataFolderPath } from "../util/path-joiner";
import { ensureScriptFolders } from "./common";

export const fileSystemOriginListScripts = async (
    basePath: string,
): Promise<ImbricateScriptMetadata[]> => {

    await ensureScriptFolders(basePath);

    const scriptMetadataPath: string = getScriptsMetadataFolderPath(basePath);

    const scriptMetadataFiles: string[] = await directoryFiles(scriptMetadataPath);

    console.log(scriptMetadataFiles);

    return [];
};
