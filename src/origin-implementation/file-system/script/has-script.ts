/**
 * @author WMXPY
 * @namespace FileSystem_Script
 * @description Has Script
 */

import { ImbricateScriptMetadata } from "../../../definition/script";
import { fileSystemOriginListScripts } from "./list-scripts";

export const fileSystemOriginHasScript = async (
    basePath: string,
    scriptName: string,
): Promise<boolean> => {

    const scriptList: ImbricateScriptMetadata[] =
        await fileSystemOriginListScripts(basePath);

    return scriptList.some((script: ImbricateScriptMetadata) => script.scriptName === scriptName);
};
