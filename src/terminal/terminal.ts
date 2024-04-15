/**
 * @author WMXPY
 * @namespace Terminal
 * @description Terminal
 */

import { formatJSON } from "../util/format-json";
import { ITerminalController } from "./definition";

export class TTYTerminalController implements ITerminalController {

    public static create(): TTYTerminalController {

        return new TTYTerminalController();
    }

    private constructor() {

    }

    public printInfo(...args: string[]): void {

        console.log(...args);
    }

    public printJsonInfo(input: any): void {

        this.printInfo(formatJSON(input));
    }

    public printErrorMessage(...args: string[]): void {

        console.error(...args);
    }

    public printJsonErrorMessage(input: any): void {

        this.printErrorMessage(formatJSON(input));
    }
}
