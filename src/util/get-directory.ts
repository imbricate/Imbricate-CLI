/**
 * @author WMXPY
 * @namespace Util
 * @description Get Directory
 */

import { CommandCommonOptions } from "../definition/options";
import * as Path from "path";

export const getDirectory = (options: CommandCommonOptions): string => {

    const directory: string = typeof options.directory === "string"
        ? Path.resolve(options.directory)
        : process.cwd();

    return directory;
};
