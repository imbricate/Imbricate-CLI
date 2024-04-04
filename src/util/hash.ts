/**
 * @author WMXPY
 * @namespace Util
 * @description Hash
 */

import { createHash } from "crypto";

export const hashString = (input: string): string => {

    return createHash("sha1").update(input).digest("hex");
};
