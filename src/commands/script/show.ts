/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Show
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptAttributes } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetScript } from "../../script/get-script";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { formatLog } from "../../util/format-log";

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
            "-n, --script-name <script-name>",
            "show script by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "show script by script identifier or pointer (one-of)",
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

            const scriptAttributes: ImbricateScriptAttributes =
                await script.readAttributes();

            if (options.json) {

                terminalController.printJsonInfo({
                    scriptName: script.scriptName,
                    identifier: script.identifier,
                    attributes: scriptAttributes,
                    createdAt: script.createdAt.toISOString(),
                    updatedAt: script.updatedAt.toISOString(),
                });
                return;
            }

            const textOutput: string = [
                `Script Name: ${script.scriptName}`,
                `Identifier: ${script.identifier}`,
                `Attributes: ${formatLog(scriptAttributes)}`,
                `Created At: ${script.createdAt.toLocaleString()}`,
                `Updated At: ${script.updatedAt.toLocaleString()}`,
            ].join("\n");

            terminalController.printInfo(textOutput);
        }));

    return showCommand;
};
