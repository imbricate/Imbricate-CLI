/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Open
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { openFileAndMonitor } from "../../editing/open-file";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ConfigOpenCommandOptions = {

    // No options
};

export const createConfigOpenCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const openCommand: Command = createConfiguredCommand("open");

    openCommand
        .description("open imbricate configuration with current profile")
        .action(createActionRunner(terminalController, async (
            _options: ConfigOpenCommandOptions,
        ): Promise<void> => {

            const configurationPath: string = configurationManager.configurationPath;

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
            );

            await openFileAndMonitor(
                profile.getActiveHandsFreeEditCommand(),
                configurationPath,
                terminalController,
            );

            terminalController.printInfo(`File Opened: ${configurationPath}`);
        }));

    return openCommand;
};
