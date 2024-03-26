/**
 * @author WMXPY
 * @namespace CLI
 * @description Terminal Controller
 * @override Mock
 */

import { ITerminalController } from "../../src/cli/terminal/definition";

export class MockTerminalController implements ITerminalController {


    public static create(): MockTerminalController {

        return new MockTerminalController();
    }

    private readonly _infoLogs: string[][];

    private constructor() {

        this._infoLogs = [];
    }

    public get infoLogs(): string[][] {
        return this._infoLogs;
    }
    printInfo(...args: string[]): void {
        this._infoLogs.push(args);
    }
}
