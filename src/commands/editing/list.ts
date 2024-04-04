/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description List
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { readActiveEditing } from "../../editing/controller";
import { ActiveEditing, SAVING_TARGET_TYPE, SavingTarget } from "../../editing/definition";
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

            if (activeEditing.length === 0) {
                terminalController.printInfo("No Active Editing");
                return;
            }

            const parsedOutput: string = activeEditing.map((each: ActiveEditing) => {

                let reference: string | undefined;
                switch (each.target.type) {
                    case SAVING_TARGET_TYPE.PAGE: {

                        const fixedTarget = each.target as SavingTarget<SAVING_TARGET_TYPE.PAGE>;
                        reference = [
                            fixedTarget.payload.origin,
                            fixedTarget.payload.collection,
                            fixedTarget.payload.identifier,
                        ].join(":");
                        break;
                    }
                    case SAVING_TARGET_TYPE.SCRIPT: {

                        const fixedTarget = each.target as SavingTarget<SAVING_TARGET_TYPE.SCRIPT>;
                        reference = [
                            fixedTarget.payload.origin,
                            fixedTarget.payload.identifier,
                        ].join(":");
                        break;
                    }
                }

                return [
                    `${each.target.type} - ${reference}`,
                    `|> ${each.path}`,
                ].join("\n");
            }).join("\n");

            terminalController.printInfo(parsedOutput);
        }));

    return listCommand;
};
