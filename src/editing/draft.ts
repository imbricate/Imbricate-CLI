/**
 * @author WMXPY
 * @namespace Editing
 * @description Draft
 */

import { directoryFiles } from "@sudoo/io";
import { fixImbricateTempDirectory } from "../util/fix-directory";

export const readEditingDraftFolders = async (): Promise<string[]> => {

    const tempDirectory = fixImbricateTempDirectory();
    const tempFolders: string[] = await directoryFiles(tempDirectory);

    return tempFolders;
};

export const resolveDraftFolderPath = (identifier: string): string => {

    const tempDirectory = fixImbricateTempDirectory(identifier);
    return tempDirectory;
};
