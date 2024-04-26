/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description Save All
 */

import { readActiveEditing } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { ActiveEditing } from "../../editing/definition";
import { performSaveAndCleanup } from "../../editing/open-file";
import { getActiveEditingReference } from "../../editing/reference";
import { getContentWithSavingTarget } from "../../editing/saving-target/get-content";
import { CLIInvalidSavingTarget } from "../../error/editing/invalid-saving-target";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type EditingSaveAllCommandOptions = {

    readonly quiet?: boolean;
};

export const createEditingSaveAllCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const saveAllCommand: Command = createConfiguredCommand("save-all");

    saveAllCommand
        .description("save all existing editing pages and scripts")
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            options: EditingSaveAllCommandOptions,
        ): Promise<void> => {

            const activeEditing: ActiveEditing[] = await readActiveEditing();

            if (activeEditing.length === 0) {

                if (!options.quiet) {
                    terminalController.printInfo("No Active Editing Found");
                }
                return;
            }

            for (const targetEditing of activeEditing) {

                const reference: string = getActiveEditingReference(targetEditing);

                const beforeContent: string | null = await getContentWithSavingTarget(
                    targetEditing.target,
                    globalManager,
                );

                if (!beforeContent) {
                    throw CLIInvalidSavingTarget.withSavingTarget(targetEditing.target);
                }

                if (!options.quiet) {

                    terminalController.printInfo(
                        [
                            "Saving Editing",
                            `|| ${targetEditing.target.type} - ${reference}`,
                            `|> ${targetEditing.identifier}`,
                            `|- ${targetEditing.path}`,
                        ].join("\n"),
                    );
                }

                await performSaveAndCleanup(
                    targetEditing.path,
                    beforeContent,
                    targetEditing.target,
                    globalManager,
                    terminalController,
                );
            }
        }));

    return saveAllCommand;
};
