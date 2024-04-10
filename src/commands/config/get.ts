/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Get
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";

type ConfigGetCommandOptions = {

    readonly json?: boolean;
};

export const createConfigGetCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const getCommand: Command = createConfiguredCommand("get");

    getCommand
        .description("get imbricate configuration from key")
        .argument("<config-key>", "the key of the configuration")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            key: string,
            options: ConfigGetCommandOptions,
        ): Promise<void> => {

            const profile: ConfigurationProfileManager =
                configurationManager.getDefaultProfile();

            let value: string | undefined = undefined;
            switch (key) {

                case "editCommand": {
                    value = profile.getActiveEditCommand();
                    break;
                }
                case "editHandsFreeCommand": {
                    value = profile.getActiveHandsFreeEditCommand();
                    break;
                }
                case "diffCommand": {
                    value = profile.getActiveDiffCommand();
                    break;
                }
            }

            if (options.json) {

                terminalController.printInfo(
                    JSON.stringify({
                        key,
                        value,
                    }, null, 2),
                );
                return;
            }

            terminalController.printInfo(value || "[Unknown]");
        }));

    return getCommand;
};
