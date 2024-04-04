/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description List
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { readActiveEditing } from "../../editing/controller";
import { ActiveEditing } from "../../editing/definition";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type EditingListCommandOptions = {

    readonly json?: boolean;
};

export const createEditingListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");

    listCommand
        .description("list editing pages and scripts")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: EditingListCommandOptions,
        ): Promise<void> => {

            const activeEditing: ActiveEditing[] = await readActiveEditing();

            if (options.json) {
                terminalController.printInfo(
                    JSON.stringify(activeEditing, null, 2),
                );
                return;
            }

            const parsedOutput: string = activeEditing.map((each: ActiveEditing) => {
                return [
                    each.hash,
                    `- ${each.path}`,
                ].join("\n");
            }).join("\n");

            terminalController.printInfo(parsedOutput);
        }));

    return listCommand;
};
