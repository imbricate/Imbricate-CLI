/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description List
 */

import { ActiveEditing, readActiveEditing } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { mapEditingLeastCommonIdentifier } from "../../editing/map-identifier";
import { getActiveEditingReference } from "../../editing/reference";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type EditingListCommandOptions = {

    readonly json?: boolean;
};

export const createEditingListCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");
    listCommand.alias("ls");

    listCommand
        .description("list editing pages and scripts")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: EditingListCommandOptions,
        ): Promise<void> => {

            const activeEditing: ActiveEditing[] = await readActiveEditing();

            if (options.json) {
                terminalController.printJsonInfo(
                    activeEditing,
                );
                return;
            }

            if (activeEditing.length === 0) {
                terminalController.printInfo("No Active Editing");
                return;
            }

            const mappedIdentifier: Record<string, string> =
                mapEditingLeastCommonIdentifier(activeEditing);

            const parsedOutput: string = activeEditing.map((each: ActiveEditing) => {

                const reference: string = getActiveEditingReference(each);
                return [
                    `${each.target.type} - ${reference}`,
                    `|> ${mappedIdentifier[each.identifier]}`,
                    `|- ${each.path}`,
                ].join("\n");
            }).join("\n");

            terminalController.printInfo(parsedOutput);
        }));

    return listCommand;
};
