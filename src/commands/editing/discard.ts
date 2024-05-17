/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description Discard
 */

import { ActiveEditing, cleanupImbricateSavingTarget, readActiveEditing } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIEditingNotFound } from "../../error/editing/editing-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type EditingDiscardCommandOptions = {

    readonly quiet?: boolean;
};

export const createEditingDiscardCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const discardCommand: Command = createConfiguredCommand("discard");

    discardCommand
        .description("discard existing editing pages and scripts")
        .argument("<editing-identifier>", "the identifier of active editing")
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            editingIdentifier: string,
            options: EditingDiscardCommandOptions,
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

            const result: boolean = await cleanupImbricateSavingTarget(targetEditing.target);

            if (!result) {
                if (!options.quiet) {
                    terminalController.printInfo("No Active Editing Found");
                }
                return;
            }

            if (!options.quiet) {
                terminalController.printInfo("Active Editing Discarded");
            }
        }));

    return discardCommand;
};
