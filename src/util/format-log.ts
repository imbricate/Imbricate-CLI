/**
 * @author WMXPY
 * @namespace Util
 * @description Format Log
 */

export const formatLog = (input: any): string => {

    return JSON.stringify(input, null, 2);
};
