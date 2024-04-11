/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Run
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptSnapshot, SandboxFeature } from "@imbricate/core";
import { END_SIGNAL, MarkedResult } from "@sudoo/marked";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIScriptExecuteFailed } from "../../error/script/script-execute-failed";
import { CLIScriptInvalidInput } from "../../error/script/script-invalid-input";
import { CLIScriptNotFound } from "../../error/script/script-not-found";
import { GlobalManager } from "../../global/global-manager";
import { createIOFeatures } from "../../script/features/io";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptRunCommandOptions = {

    readonly quiet?: boolean;

    readonly scriptName?: string;
    readonly identifier?: string;
};

export const createScriptRunCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const runCommand: Command = createConfiguredCommand("run");

    runCommand
        .description("run a existing standalone script")
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
            options: ScriptRunCommandOptions,
        ): Promise<void> => {

            if (!options.scriptName && !options.identifier) {
                throw CLIScriptInvalidInput.withMessage("One of --script-name or --identifier is required");
            }

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const scriptSnapshots: ImbricateScriptSnapshot[] = await currentOrigin.listScripts();

            const interfaceFeatures: SandboxFeature[] = [
                ...createIOFeatures(terminalController),
            ];

            if (typeof options.scriptName === "string") {

                const scriptSnapshot: ImbricateScriptSnapshot | undefined =
                    scriptSnapshots.find((each: ImbricateScriptSnapshot) => {
                        return each.scriptName === options.scriptName;
                    });

                if (!scriptSnapshot) {
                    throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
                }

                const script: IImbricateScript | null = await currentOrigin.getScript(scriptSnapshot.identifier);

                if (!script) {
                    throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
                }

                const executeResult: MarkedResult | null =
                    await script.execute(
                        interfaceFeatures,
                        {},
                        {},
                    );

                if (!executeResult) {
                    throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
                }

                if (executeResult.signal === END_SIGNAL.SUCCEED) {

                    if (!options.quiet) {
                        terminalController.printInfo(`Script "${scriptSnapshot.scriptName}" executed successfully`);
                    }
                } else {
                    throw CLIScriptExecuteFailed.create(scriptSnapshot.scriptName, executeResult);
                }

                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const each of scriptSnapshots) {

                    if (each.identifier.startsWith(options.identifier)) {

                        const script: IImbricateScript | null = await currentOrigin.getScript(each.identifier);

                        if (!script) {
                            throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
                        }

                        const executeResult: MarkedResult | null =
                            await script.execute(
                                interfaceFeatures,
                                {},
                                {},
                            );

                        if (!executeResult) {
                            throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${options.identifier}" not found`);
                        }

                        if (executeResult.signal === END_SIGNAL.SUCCEED) {

                            if (!options.quiet) {
                                terminalController.printInfo(`Script "${each.scriptName}" executed successfully`);
                            }
                        } else {
                            throw CLIScriptExecuteFailed.create(each.scriptName, executeResult);
                        }

                        return;
                    }
                }

                throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${options.identifier}" not found`);
            }
        }));

    return runCommand;
};
