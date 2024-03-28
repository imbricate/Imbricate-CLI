/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description Has Script
 */

import { directoryFiles } from "@sudoo/io";
import { getScriptsMetadataFolderPath } from "../util/path-joiner";
import { ensureScriptFolders } from "./common";

export const fileSystemOriginHasScript = async (
    basePath: string,
    scriptName: string,
): Promise<boolean> => {

    await ensureScriptFolders(basePath);

    const scriptMetadataPath: string = getScriptsMetadataFolderPath(basePath);

    const scriptMetadataFiles: string[] = await directoryFiles(scriptMetadataPath);

    console.log(scriptMetadataFiles);

    return scriptMetadataFiles.includes(scriptName);
};
