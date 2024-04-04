/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Open
 */

import { IImbricateOrigin, ImbricateScriptSnapshot } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { SAVING_TARGET_TYPE, SavingTarget } from "../../editing/definition";
import { openContentAndMonitor } from "../../editing/open-file";
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
    configurationManager: IConfigurationManager,
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

            const scriptSnapshots: ImbricateScriptSnapshot[] = await currentOrigin.listScripts();

            if (typeof options.scriptName === "string") {

                const scriptSnapshot: ImbricateScriptSnapshot | undefined =
                    scriptSnapshots.find((each: ImbricateScriptSnapshot) => {
                        return each.scriptName === options.scriptName;
                    });

                if (!scriptSnapshot) {
                    throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
                }

                const script = await currentOrigin.getScript(scriptSnapshot.identifier);

                if (!script) {
                    throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier "${scriptSnapshot.identifier}" not found`);
                }

                const scriptContent: string = await script.readScript();
                const target: SavingTarget<SAVING_TARGET_TYPE.SCRIPT> = {

                    type: SAVING_TARGET_TYPE.SCRIPT,
                    payload: {
                        origin: globalManager.activeOrigin!,
                        identifier: scriptSnapshot.identifier,
                    },
                };

                await openContentAndMonitor(
                    scriptContent,
                    `${scriptSnapshot.scriptName}.js`,
                    target,
                    globalManager,
                    terminalController,
                    configurationManager,
                );

                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const each of scriptSnapshots) {

                    if (each.identifier.startsWith(options.identifier)) {

                        const script = await currentOrigin.getScript(each.identifier);

                        if (!script) {
                            throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier "${each.identifier}" not found`);
                        }

                        const scriptContent: string = await script.readScript();
                        const target: SavingTarget<SAVING_TARGET_TYPE.SCRIPT> = {

                            type: SAVING_TARGET_TYPE.SCRIPT,
                            payload: {
                                origin: globalManager.activeOrigin!,
                                identifier: each.identifier,
                            },
                        };

                        await openContentAndMonitor(
                            scriptContent,
                            `${each.scriptName}.js`,
                            target,
                            globalManager,
                            terminalController,
                            configurationManager,
                        );

                        return;
                    }
                }

                throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${options.identifier}" not found`);
            }
        }));

    return openCommand;
};
