/**
 * @author WMXPY
 * @namespace Terminal
 * @description Definition
 */

export interface ITerminalController {

    printInfo(...args: string[]): void;
    printErrorMessage(...args: string[]): void;
}
