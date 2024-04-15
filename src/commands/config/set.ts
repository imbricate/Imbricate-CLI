/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Set
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { CLIConfigurationValueInvalidError } from "../../error/configuration/configuration-value-invalid";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ConfigSetCommandOptions = {

    readonly quiet?: boolean;
};

const parseValueToStringArray = (value: string): string[] => {

    const parsedValue: string[] = JSON.parse(value);

    if (!Array.isArray(parsedValue)) {

        throw CLIConfigurationValueInvalidError.withValue(value);
    }
    return parsedValue;
};

export const createConfigSetCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const setCommand: Command = createConfiguredCommand("set");

    setCommand
        .description("set imbricate configuration from key and value")
        .argument("<config-key>", "the key of the configuration")
        .argument("<config-value>", "the value of the configuration")
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            key: string,
            value: string,
            options: ConfigSetCommandOptions,
        ): Promise<void> => {

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
                options.quiet,
            );

            switch (key) {

                case "editCommand": {
                    await profile.setEditCommand(
                        parseValueToStringArray(value),
                    );
                    break;
                }
                case "editHandsFreeCommand": {
                    await profile.setHandsFreeEditCommand(
                        parseValueToStringArray(value),
                    );
                    break;
                }
                case "diffCommand": {
                    await profile.setDiffCommand(
                        parseValueToStringArray(value),
                    );
                    break;
                }
                default: {
                    if (!options.quiet) {
                        terminalController.printErrorMessage(`Configuration ${key} not found`);
                    }
                    return;
                }
            }

            if (!options.quiet) {
                terminalController.printInfo(`Configuration ${key} set to ${value}`);
            }
        }));

    return setCommand;
};
