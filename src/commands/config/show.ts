/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Show
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { IRawImbricateConfiguration } from "../../configuration/raw-definition";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ConfigShowCommandOptions = {

    readonly json?: boolean;
};

export const createConfigShowCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show imbricate configurations")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: ConfigShowCommandOptions,
        ): Promise<void> => {

            const configuration: IRawImbricateConfiguration =
                configurationManager.buildConfiguration();

            if (options.json) {

                terminalController.printInfo(
                    JSON.stringify(configuration, null, 2),
                );
                return;
            }

            const textOutput: string =
                Object.entries(configuration)
                    .map(([key, value]: [string, any]) => `${key}: ${value
                        ? JSON.stringify(value, null, 2)
                        : "[Unknown]"}`)
                    .join("\n");

            terminalController.printInfo(textOutput);
        }));

    return showCommand;
};
