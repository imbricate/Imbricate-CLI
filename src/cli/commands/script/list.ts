/**
 * @author WMXPY
 * @namespace CLI_Commands_Script
 * @description List
 */

import { Command } from "commander";
import { ImbricateScriptMetadata } from "../../../definition/script";
import { IImbricateOrigin } from "../../../origin/interface";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptListCommandOptions = {

    readonly json?: boolean;
};

export const createScriptListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");

    listCommand
        .description("list standalone scripts")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: ScriptListCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const scripts: ImbricateScriptMetadata[] = await currentOrigin.listScripts();

            if (options.json) {

                terminalController.printInfo(JSON.stringify(scripts.map((script) => {
                    return {
                        scriptName: script.scriptName,
                        description: script.identifier,
                    };
                }), null, 2));
                return;
            }

            if (scripts.length === 0) {
                terminalController.printInfo("No script found");
                return;
            }

            terminalController.printInfo(scripts.map((script: ImbricateScriptMetadata) => {
                return script.scriptName;
            }).join("\n"));

            return;
        }));

    return listCommand;
};
