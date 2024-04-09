/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description Save
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { readActiveEditing } from "../../editing/controller";
import { ActiveEditing } from "../../editing/definition";
import { performSaveAndCleanup } from "../../editing/open-file";
import { getActiveEditingReference } from "../../editing/reference";
import { getContentWithSavingTarget } from "../../editing/saving-target/get-content";
import { CLIEditingNotFound } from "../../error/editing/editing-not-found";
import { CLIInvalidSavingTarget } from "../../error/editing/invalid-saving-target";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type EditingSaveCommandOptions = {

    readonly json?: boolean;
};

export const createEditingSaveCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const saveCommand: Command = createConfiguredCommand("save");

    saveCommand
        .description("save existing editing pages and scripts")
        .argument("<editing-identifier>", "the identifier of active editing")
        .action(createActionRunner(terminalController, async (
            editingIdentifier: string,
            _options: EditingSaveCommandOptions,
        ): Promise<void> => {

            const activeEditing: ActiveEditing[] = await readActiveEditing();

            const targetEditing: ActiveEditing | undefined = activeEditing.find((
                each: ActiveEditing,
            ) => {
                return each.identifier.startsWith(editingIdentifier);
            });

            if (!targetEditing) {
                throw CLIEditingNotFound.withPartialIdentifier(editingIdentifier);
            }

            const reference: string = getActiveEditingReference(targetEditing);

            const beforeContent: string | null = await getContentWithSavingTarget(
                targetEditing.target,
                globalManager,
            );

            if (!beforeContent) {
                throw CLIInvalidSavingTarget.withSavingTarget(targetEditing.target);
            }

            terminalController.printInfo(
                [
                    "Active Editing Found",
                    `|| ${targetEditing.target.type} - ${reference}`,
                    `|> ${targetEditing.identifier}`,
                    `|- ${targetEditing.path}`,
                ].join("\n"),
            );

            await performSaveAndCleanup(
                targetEditing.path,
                beforeContent,
                targetEditing.target,
                globalManager,
                terminalController,
            );
        }));

    return saveCommand;
};
