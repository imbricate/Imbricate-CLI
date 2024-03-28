/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description Remove Script
 */

import { removeFile } from "@sudoo/io";
import { getScriptsFolderPath, getScriptsMetadataFolderPath } from "../util/path-joiner";
import { ensureScriptFolders, fixMetaScriptFileName, fixScriptFileName } from "./common";

export const fileSystemOriginRemoveScript = async (
    basePath: string,
    identifier: string,
    scriptName: string,
): Promise<void> => {

    await ensureScriptFolders(basePath);

    const fileName: string = fixMetaScriptFileName(scriptName, identifier);
    const scriptMetadataFilePath: string = getScriptsMetadataFolderPath(
        basePath,
        fileName,
    );

    await removeFile(scriptMetadataFilePath);

    const scriptFileName: string = fixScriptFileName(identifier);
    const scriptFolderPath: string = getScriptsFolderPath(basePath, scriptFileName);

    await removeFile(scriptFolderPath);
};
