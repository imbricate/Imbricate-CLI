/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Show
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

type ScriptShowCommandOptions = {

    readonly json?: boolean;

    readonly scriptName?: string;
    readonly identifier?: string;
};

export const createScriptShowCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show details of a existing standalone script")
        .option("-j, --json", "print result as JSON")
        .option(
            "-s, --script-name <script-name>",
            "delete page by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "delete page by script identifier or pointer (one-of)",
        )
        .action(createActionRunner(terminalController, async (
            options: ScriptShowCommandOptions,
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

            if (options.json) {

                terminalController.printInfo(JSON.stringify({
                    scriptName: script.scriptName,
                    identifier: script.identifier,
                    createdAt: script.createdAt.toISOString(),
                    updatedAt: script.updatedAt.toISOString(),
                }, null, 2));
                return;
            }

            const textOutput: string = [
                `Script Name: ${script.scriptName}`,
                `Identifier: ${script.identifier}`,
                `Created At: ${script.createdAt.toLocaleString()}`,
                `Updated At: ${script.updatedAt.toLocaleString()}`,
            ].join("\n");

            terminalController.printInfo(textOutput);
        }));

    return showCommand;
};
