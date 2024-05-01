/**
 * @author WMXPY
 * @namespace CLI
 * @description Terminal Controller
 * @override Mock
 */

import { ITerminalController } from "../../src/terminal/definition";

export class MockTerminalController implements ITerminalController {

    public static create(): MockTerminalController {

        return new MockTerminalController();
    }

    private readonly _infoLogs: string[][];
    private readonly _errorLogs: string[][];

    private constructor() {

        this._infoLogs = [];
        this._errorLogs = [];
    }

    public get infoLogs(): string[][] {
        return this._infoLogs;
    }

    public printInfo(...args: string[]): void {
        this._infoLogs.push(args);
    }

    public printJsonInfo(input: any): void {
        this.printInfo(JSON.stringify(input));
    }

    public get errorLogs(): string[][] {
        return this._errorLogs;
    }

    public printErrorMessage(...args: string[]): void {
        this._errorLogs.push(args);
    }

    public printJsonErrorMessage(input: any): void {
        this.printErrorMessage(JSON.stringify(input));
    }
}
