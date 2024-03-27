/**
 * @author WMXPY
 * @namespace FileSystem_Util
 * @description IO
 */

import { attemptMarkDir, isFile, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";

export const createOrGetFile = async (
    path: string,
    defaultValue: string,
): Promise<string> => {

    const fileExist: boolean = await pathExists(path);

    if (fileExist) {

        const pathIsFile: boolean = await isFile(path);

        if (!pathIsFile) {
            throw new Error(`Path "${path}" is not a file`);
        }

        return await readTextFile(path);
    }

    const folderPath = Path.dirname(path);

    await attemptMarkDir(folderPath);
    await writeTextFile(path, defaultValue);

    return defaultValue;
};
