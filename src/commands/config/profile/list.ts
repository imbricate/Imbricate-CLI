/**
 * @author WMXPY
 * @namespace Commands_Config_Profile
 * @description List
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ConfigProfileListCommandOptions = {

    readonly json?: boolean;
};

export const createConfigProfileListCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");

    listCommand
        .description("list preset configuration for editor commands")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: ConfigProfileListCommandOptions,
        ): Promise<void> => {

            const profileNames: string[] = Object.keys(configurationManager.profiles);

            const jsonOutput = profileNames.map((profileName: string) => {

                return {
                    profileName,
                    default: profileName === configurationManager.defaultProfile,
                };
            });

            if (options.json) {

                terminalController.printInfo(JSON.stringify(
                    jsonOutput,
                    null,
                    2,
                ));
                return;
            }

            const textOutput: string = profileNames
                .map((profileName: string) => {

                    if (profileName === configurationManager.defaultProfile) {
                        return `${profileName} (default)`;
                    }

                    return profileName;
                })
                .join("\n");

            terminalController.printInfo(textOutput);
        }));

    return listCommand;
};
