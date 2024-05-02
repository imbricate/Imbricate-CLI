/**
 * @author WMXPY
 * @namespace Util
 * @description Fix Directory
 */

import * as Path from "path";

export const fixCurrentWorkingDirectory = (directory?: string): string => {

    const fixedDirectory: string = typeof directory === "string"
        ? Path.resolve(directory)
        : process.cwd();

    return fixedDirectory;
};

export const resolveDirectory = (...paths: string[]): string => {

    const resolvedPath: string = Path.resolve(...paths);

    return resolvedPath;
};

export const getFileName = (filePath: string): string => {

    const parsedPath: Path.ParsedPath = Path.parse(filePath);
    return parsedPath.name;
};

export const getFolderPath = (filePath: string): string => {

    const parsedPath: Path.ParsedPath = Path.parse(filePath);
    return parsedPath.dir;
};
