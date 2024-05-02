/**
 * @author WMXPY
 * @namespace Editing
 * @description Draft
 */

import { resolveImbricateTempDirectory } from "@imbricate/local-fundamental";
import { directoryFiles } from "@sudoo/io";

export const readEditingDraftFolders = async (): Promise<string[]> => {

    const tempDirectory = resolveImbricateTempDirectory();
    const tempFolders: string[] = await directoryFiles(tempDirectory);

    return tempFolders;
};

export const resolveDraftFolderPath = (identifier: string): string => {

    const tempDirectory = resolveImbricateTempDirectory(identifier);
    return tempDirectory;
};
