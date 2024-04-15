/**
 * @author WMXPY
 * @namespace Terminal
 * @description Definition
 */

export interface ITerminalController {

    printInfo(...args: string[]): void;
    printJsonInfo(input: any): void;
    printErrorMessage(...args: string[]): void;
}
