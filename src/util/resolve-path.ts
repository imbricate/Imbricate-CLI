/**
 * @author WMXPY
 * @namespace Util
 * @description Resolve Path
 */

import * as Path from "path";

export const resolvePath = (...path: string[]): string => {

    return Path.resolve(...path);
};
