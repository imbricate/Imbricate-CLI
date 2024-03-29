/**
 * @author WMXPY
 * @namespace CLI_Commands_Script
 * @description Open
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

type ScriptOpenCommandOptions = {

    readonly scriptName?: string;
    readonly identifier?: string;
};

export const createScriptOpenCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const openCommand: Command = createConfiguredCommand("open");

    openCommand
        .description("open a existing standalone script")
        .option(
            "-s, --script-name <script-name>",
            "delete page by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "delete page by script identifier or pointer (one-of)",
        )
        .action(createActionRunner(terminalController, async (
            options: ScriptOpenCommandOptions,
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

                await currentOrigin.openScript(script.identifier);
                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const each of scripts) {

                    if (each.identifier.startsWith(options.identifier)) {

                        await currentOrigin.openScript(each.identifier);
                        return;
                    }
                }

                throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${options.identifier}" not found`);
            }
        }));

    return openCommand;
};
