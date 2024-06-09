/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Rename
 */

import { IImbricateOrigin, IImbricateScript } from "@imbricate/core";
import { ActiveEditing, SAVING_TARGET_TYPE, SavingTarget, readActiveEditing } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetScript } from "../../script/get-script";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptRenameCommandOptions = {

    readonly quiet?: boolean;

    readonly scriptName?: string;
    readonly identifier?: string;
};

export const createScriptRenameCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const renameCommand: Command = createConfiguredCommand("rename");

    renameCommand
        .description("rename an existing script with a new script name")
        .argument("<new-script-name>", "the new name of the script")
        .option("-q, --quiet", "quiet mode")
        .option(
            "-n, --script-name <script-name>",
            "rename script by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "rename script by script identifier or pointer (one-of)",
        )
        .action(createActionRunner(terminalController, async (
            newScriptName: string,
            options: ScriptRenameCommandOptions,
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

            const activeEditing: ActiveEditing[] = await readActiveEditing();

            for (const editing of activeEditing) {

                const target: SavingTarget<any> = editing.target;

                if (target.type === SAVING_TARGET_TYPE.SCRIPT
                    && target.payload.identifier === script.identifier) {

                    throw new Error(`Cannot rename script "${script.scriptName}" while editing`);
                }
            }

            if (!options.quiet) {

                terminalController.printInfo(`Found script "${script.scriptName}" with identifier "${script.identifier}"`);
            }

            await currentOrigin
                .getScriptManager()
                .renameScript(script.identifier, newScriptName);

            if (!options.quiet) {

                terminalController.printInfo(`Renamed script "${script.scriptName}" -> "${newScriptName}"`);
            }
        }));

    return renameCommand;
};
