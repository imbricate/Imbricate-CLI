/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description Save
 */

import { hashString, readTextFile } from "@sudoo/io";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { readActiveEditing } from "../../editing/controller";
import { ActiveEditing } from "../../editing/definition";
import { getActiveEditingReference } from "../../editing/reference";
import { cleanupSavingTarget, performSavingTarget } from "../../editing/save-target";
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

            const updatedContent: string = await readTextFile(targetEditing.path);

            const beforeChecksum: string = hashString(beforeContent);
            const afterChecksum: string = hashString(updatedContent);

            terminalController.printInfo(`<- #[${beforeChecksum}]`);
            terminalController.printInfo(`-> #[${afterChecksum}]`);

            if (beforeChecksum === afterChecksum) {

                terminalController.printInfo("No Change Detected...");
                await cleanupSavingTarget(targetEditing.target);
                terminalController.printInfo("Edit Cancelled");
            } else {

                terminalController.printInfo("Saving...");
                await performSavingTarget(targetEditing.target, updatedContent, globalManager);
                terminalController.printInfo("Edit Saved");
            }
        }));

    return saveCommand;
};
