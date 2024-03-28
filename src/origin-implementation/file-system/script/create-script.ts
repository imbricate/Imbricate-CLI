/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description Create Script
 */

import { writeTextFile } from "@sudoo/io";
import { UUIDVersion1 } from "@sudoo/uuid";
import { ImbricateScriptMetadata } from "../../../definition/script";
import { getScriptsMetadataFolderPath } from "../util/path-joiner";
import { ensureScriptFolders, fixMetaScriptFileName } from "./common";

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

    return {
        scriptName,
        identifier: uuid,
    };
};
