/**
 * @author WMXPY
 * @namespace CLI_Util
 * @description Fix Directory
 */

import * as Path from "path";

export const fixDirectory = (directory?: string): string => {

    const fixedDirectory: string = typeof directory === "string"
        ? Path.resolve(directory)
        : process.cwd();

    return fixedDirectory;
};
