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

export const fixHomeDirectory = (...paths: string[]): string => {

    const homePath: string = process.env.HOME || process.env.USERPROFILE || "~";
    const resolvedPath: string = Path.resolve(homePath, ...paths);

    return resolvedPath;
};

export const fixImbricateHomeDirectory = (...paths: string[]): string => {

    const configurationPath: string = fixHomeDirectory(".imbricate");
    return Path.join(configurationPath, ...paths);
};

export const fixImbricateTempDirectory = (...paths: string[]): string => {

    const imbricateHome: string = fixImbricateHomeDirectory();
    const tempPath: string = Path.join(imbricateHome, "temp");

    return Path.resolve(tempPath, ...paths);
};

export const resolveDirectory = (...paths: string[]): string => {

    const resolvedPath: string = Path.resolve(...paths);

    return resolvedPath;
};
