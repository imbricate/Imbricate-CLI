/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description Resume
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { readActiveEditing } from "../../editing/controller";
import { ActiveEditing } from "../../editing/definition";
import { openContentAndMonitor } from "../../editing/open-file";
import { getActiveEditingReference } from "../../editing/reference";
import { getContentWithSavingTarget } from "../../editing/saving-target/get-content";
import { CLIEditingNotFound } from "../../error/editing/editing-not-found";
import { CLIInvalidSavingTarget } from "../../error/editing/invalid-saving-target";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { getFileName } from "../../util/fix-directory";

type EditingResumeCommandOptions = {

    readonly handsFree?: boolean;
};

export const createEditingResumeCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const resumeCommand: Command = createConfiguredCommand("resume");

    resumeCommand
        .description("resume existing editing pages and scripts")
        .argument("<editing-identifier>", "the identifier of active editing")
        .option("-h, --hands-free", "resume the editing without monitoring the file changes")
        .action(createActionRunner(terminalController, async (
            editingIdentifier: string,
            options: EditingResumeCommandOptions,
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

            const fileName: string = getFileName(targetEditing.path);

            await openContentAndMonitor(
                beforeContent,
                fileName,
                targetEditing.target,
                globalManager,
                terminalController,
                profile,
                options.handsFree ?? false,
            );
        }));

    return resumeCommand;
};
