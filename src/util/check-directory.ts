/**
 * @author WMXPY
 * @namespace Util
 * @description Fix Directory
 */

import { isFolder } from "@sudoo/io";
import * as Path from "path";

export const checkDirectory = async (directory: string): Promise<boolean> => {

    try {

        if (!await isFolder(directory)) {
            return false;
        }

        return true;
    } catch (e) {
        return false;
    }
};

export const recursiveCheckDirectory = async (directory: string): Promise<boolean> => {

    let current: string = directory;
    const parents: string[] = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {

        const currentPath: string = Path.join(current, "..");

        if (currentPath === current) {
            break;
        }

        parents.push(currentPath);
        current = currentPath;
    }

    for (const parent of parents.reverse()) {

        if (!await checkDirectory(parent)) {
            return false;
        }
    }

    return true;
};
