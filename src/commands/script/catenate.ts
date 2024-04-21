/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Catenate
 */

import { IImbricateOrigin, IImbricateScript } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetScript } from "../../script/get-script";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { inputParsePositiveInteger } from "../../util/input-parse";

type ScriptCatenateCommandOptions = {

    readonly scriptName?: string;
    readonly identifier?: string;

    readonly lines?: number;
    readonly start?: number;
};

export const createScriptCatenateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const catenateCommand: Command = createConfiguredCommand("catenate");
    catenateCommand.alias("cat");

    catenateCommand
        .description("catenate a script")
        .option(
            "-n, --script-name <script-name>",
            "delete script by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "delete script by script identifier or pointer (one-of)",
        )
        .option(
            "-l, --lines <lines>",
            "catenate only limited lines",
            inputParsePositiveInteger,
        )
        .option(
            "-s, --start <start>",
            "catenate from specific line",
            inputParsePositiveInteger,
        )
        .action(createActionRunner(terminalController, async (
            options: ScriptCatenateCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const script: IImbricateScript = await cliGetScript(
                currentOrigin,
                options.scriptName,
                options.identifier,
            );

            const content: string = await script.readScript();

            let lines: string[] = content.split("\n");

            if (typeof options.start === "number") {
                lines = lines.slice(options.start);
            }

            if (typeof options.lines === "number") {
                lines = lines.slice(0, options.lines);
            }

            if (lines.length === 0) {
                return;
            }

            terminalController.printInfo(
                lines.join("\n"),
            );
        }));

    return catenateCommand;
};
