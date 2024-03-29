/**
 * @author WMXPY
 * @namespace CLI_Commands_Script
 * @description Delete
 */

import { IImbricateOrigin, ImbricateScriptMetadata } from "@imbricate/core";
import { Command } from "commander";
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

    const deleteCommand: Command = createConfiguredCommand("delete");

    deleteCommand
        .description("delete a existing standalone script")
        .option(
            "-s, --script-name <script-name>",
            "delete page by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "delete page by script identifier or pointer (one-of)",
        )
        .option("-q, --quiet", "quite mode")
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

                await currentOrigin.removeScript(script.identifier, script.scriptName);

                if (!options.quiet) {

                    terminalController.printInfo(`Script [${script.identifier}] -> "${script.scriptName}" deleted`);
                }

                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const each of scripts) {

                    if (each.identifier.startsWith(options.identifier)) {

                        await currentOrigin.removeScript(each.identifier, each.scriptName);

                        if (!options.quiet) {

                            terminalController.printInfo(`Script [${each.identifier}] -> "${each.scriptName}" deleted`);
                        }

                        return;
                    }
                }

                throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${options.identifier}" not found`);
            }
        }));

    return deleteCommand;
};
