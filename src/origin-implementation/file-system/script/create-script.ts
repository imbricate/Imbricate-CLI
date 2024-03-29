/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description Create Script
 */

import { ImbricateScriptMetadata } from "@imbricate/core";
import { writeTextFile } from "@sudoo/io";
import { UUIDVersion1 } from "@sudoo/uuid";
import { getScriptsFolderPath, getScriptsMetadataFolderPath } from "../util/path-joiner";
import { ensureScriptFolders, fixMetaScriptFileName, fixScriptFileName } from "./common";

export const fileSystemOriginCreateScript = async (
    basePath: string,
    scriptName: string,
): Promise<ImbricateScriptMetadata> => {

    await ensureScriptFolders(basePath);

    const uuid: string = UUIDVersion1.generateString();
    const currentTime: number = new Date().getTime();

    const fileName: string = fixMetaScriptFileName(scriptName, uuid);
    const scriptMetadataFilePath: string = getScriptsMetadataFolderPath(
        basePath,
        fileName,
    );

    await writeTextFile(scriptMetadataFilePath,
        JSON.stringify({
            scriptName,
            identifier: uuid,
            createdAt: currentTime,
            updatedAt: currentTime,
        }, null, 2),
    );

    const scriptFileName: string = fixScriptFileName(uuid);
    const scriptFolderPath: string = getScriptsFolderPath(basePath, scriptFileName);

    await writeTextFile(scriptFolderPath, "");

    return {
        scriptName,
        identifier: uuid,
    };
};
