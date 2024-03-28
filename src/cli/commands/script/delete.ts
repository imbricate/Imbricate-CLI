/**
 * @author WMXPY
 * @namespace CLI_Commands_Script
 * @description Delete
 */

import { Command } from "commander";
import { ImbricateScriptMetadata } from "../../../definition/script";
import { IImbricateOrigin } from "../../../origin/interface";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIScriptInvalidInput } from "../../error/script/script-invalid-input";
import { CLIScriptNotFound } from "../../error/script/script-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptDeleteCommandOptions = {

    readonly quiet?: boolean;

    readonly scriptName?: string;
    readonly identifier?: string;
};

export const createScriptDeleteCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("delete");

    createCommand
        .description("delete a existing standalone script")
        .option("-q, --quiet", "quite mode")
        .option(
            "-s, --script-name <script-name>",
            "delete page by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "delete page by script identifier or pointer (one-of)",
        )
        .action(createActionRunner(terminalController, async (
            options: ScriptDeleteCommandOptions,
        ): Promise<void> => {

            if (!options.scriptName && !options.identifier) {
                throw CLIScriptInvalidInput.withMessage("One of --script-name or --identifier is required");
            }

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const scripts: ImbricateScriptMetadata[] = await currentOrigin.listScripts();

            if (typeof options.scriptName === "string") {

                const script: ImbricateScriptMetadata | undefined =
                    scripts.find((each: ImbricateScriptMetadata) => {
                        return each.scriptName === options.scriptName;
                    });

                if (!script) {
                    throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
                }

                await currentOrigin.removeScript(script.identifier);
            }

            // if (!options.quiet) {
            //     terminalController.printInfo(`Script "${scriptMetadata.scriptName}" created`);
            //     terminalController.printInfo(`Identifier: ${scriptMetadata.identifier}`);
            // }
        }));

    return createCommand;
};
