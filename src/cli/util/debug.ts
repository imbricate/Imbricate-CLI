/**
 * @author WMXPY
 * @namespace CLI_Util
 * @description Debug
 */

export const isDebug = (): boolean => {

    return process.env.IMBRICATE_DEBUG === "true";
};

export const debugLog = (...args: any[]): void => {

    if (isDebug()) {
        console.log("[IMBRICATE_DEBUG]", ...args);
    }
};
