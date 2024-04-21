/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Delete
 */

import { IImbricateOrigin, ImbricateScriptSnapshot } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { SAVING_TARGET_TYPE, SavingTarget } from "../../editing/definition";
import { cleanupSavingTarget, isSavingTargetActive } from "../../editing/save-target";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIScriptEditing } from "../../error/script/script-editing";
import { CLIScriptInvalidInput } from "../../error/script/script-invalid-input";
import { CLIScriptNotFound } from "../../error/script/script-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { createScriptSavingTarget } from "../../editing/saving-target/create-saving.target";

type ScriptDeleteCommandOptions = {

    readonly quiet?: boolean;
    readonly force?: boolean;

    readonly scriptName?: string;
    readonly identifier?: string;
};

const performScriptDelete = async (
    origin: IImbricateOrigin,
    script: ImbricateScriptSnapshot,
    options: ScriptDeleteCommandOptions,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
): Promise<void> => {

    const originName: string | null = globalManager.activeOrigin;

    if (!originName) {
        throw CLIActiveOriginNotFound.create();
    }

    const savingTarget: SavingTarget<SAVING_TARGET_TYPE.SCRIPT> = createScriptSavingTarget(
        globalManager,
        script.identifier,
    );

    const isActive: boolean = await isSavingTargetActive(savingTarget);

    if (isActive) {

        if (!options.force) {

            if (!options.quiet) {

                terminalController.printInfo(`Script [${script.identifier}] -> "${script.scriptName}" is currently being edited`);
                terminalController.printInfo("Consider use --force to delete it anyway, or resolve the editing first");
            }

            throw CLIScriptEditing.withScriptIdentifier(script.identifier);
        }

        if (!options.quiet) {

            terminalController.printInfo(`Script [${script.identifier}] -> "${script.scriptName}" is currently being edited, resolving the editing...`);
        }

        await cleanupSavingTarget(savingTarget);

        if (!options.quiet) {

            terminalController.printInfo(`Editing for Script [${script.identifier}] -> "${script.scriptName}" resolved`);
        }
    }

    await origin.deleteScript(script.identifier);

    if (!options.quiet) {

        terminalController.printInfo(`Script [${script.identifier}] -> "${script.scriptName}" deleted`);
    }
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
            "-n, --script-name <script-name>",
            "delete script by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "delete script by script identifier or pointer (one-of)",
        )
        .option("-q, --quiet", "quite mode")
        .option("-f, --force", "force mode")
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

            const scripts: ImbricateScriptSnapshot[] = await currentOrigin.listScripts();

            if (typeof options.scriptName === "string") {

                const script: ImbricateScriptSnapshot | undefined =
                    scripts.find((each: ImbricateScriptSnapshot) => {
                        return each.scriptName === options.scriptName;
                    });

                if (!script) {
                    throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
                }

                await performScriptDelete(
                    currentOrigin,
                    script,
                    options,
                    globalManager,
                    terminalController,
                );

                return;
            }

            if (typeof options.identifier === "string" && options.identifier.length > 0) {

                for (const each of scripts) {

                    if (each.identifier.startsWith(options.identifier)) {

                        await performScriptDelete(
                            currentOrigin,
                            each,
                            options,
                            globalManager,
                            terminalController,
                        );

                        return;
                    }
                }

                throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${options.identifier}" not found`);
            }
        }));

    return deleteCommand;
};
