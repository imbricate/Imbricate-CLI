/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description Diff
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { readActiveEditing } from "../../editing/controller";
import { ActiveEditing } from "../../editing/definition";
import { diffSavingTarget } from "../../editing/diff-file";
import { CLIEditingNotFound } from "../../error/editing/editing-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type EditingDiffCommandOptions = {

    readonly json?: boolean;
};

export const createEditingDiffCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const diffCommand: Command = createConfiguredCommand("diff");

    diffCommand
        .description("compare editing pages and scripts with their original file")
        .argument("<editing-identifier>", "the identifier of active editing")
        .action(createActionRunner(terminalController, async (
            editingIdentifier: string,
            _options: EditingDiffCommandOptions,
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

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
            );

            await diffSavingTarget(
                targetEditing.path,
                targetEditing.target,
                globalManager,
                profile,
                terminalController,
            );
        }));

    return diffCommand;
};
