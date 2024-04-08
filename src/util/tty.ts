/**
 * @author WMXPY
 * @namespace Util
 * @description TTY
 */

export const checkIsTTY = (): boolean => {

    return process.stdout.isTTY;
};
