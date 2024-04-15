/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Get
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { formatLog } from "../../util/format-log";

type ConfigGetCommandOptions = {

    readonly json?: boolean;
};

export const createConfigGetCommand = (
    globalManager: GlobalManager,
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

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
            );

            let value: string | undefined = undefined;
            switch (key) {

                case "editCommand": {
                    value = formatLog(profile.getActiveEditCommand());
                    break;
                }
                case "editHandsFreeCommand": {
                    value = formatLog(profile.getActiveHandsFreeEditCommand());
                    break;
                }
                case "diffCommand": {
                    value = formatLog(profile.getActiveDiffCommand());
                    break;
                }
            }

            if (options.json) {

                terminalController.printJsonInfo({
                    key,
                    value,
                });
                return;
            }

            terminalController.printInfo(value || "[Unknown]");
        }));

    return getCommand;
};
