/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Open
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { resolveCLIConfigurationPath } from "../../configuration/io";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { openFileAndMonitor } from "../../editing/open-file";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ConfigOpenCommandOptions = {

    readonly quiet?: boolean;
    readonly folder?: boolean;
};

export const createConfigOpenCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const openCommand: Command = createConfiguredCommand("open");

    openCommand
        .description("open imbricate configuration with current profile")
        .option("-q, --quiet", "quite mode")
        .option("-f, --folder", "open configuration folder instead of file")
        .action(createActionRunner(terminalController, async (
            options: ConfigOpenCommandOptions,
        ): Promise<void> => {

            const configurationPath: string = configurationManager.configurationPath;
            const configurationFilePath: string = resolveCLIConfigurationPath(configurationPath);

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
            );

            if (options.folder) {

                await openFileAndMonitor(
                    profile.getActiveHandsFreeEditCommand(),
                    configurationPath,
                    terminalController,
                );

                if (!options.quiet) {
                    terminalController.printInfo(`Folder Opened: ${configurationPath}`);
                }
                return;
            }

            await openFileAndMonitor(
                profile.getActiveHandsFreeEditCommand(),
                configurationFilePath,
                terminalController,
            );

            if (!options.quiet) {
                terminalController.printInfo(`File Opened: ${configurationFilePath}`);
            }
        }));

    return openCommand;
};
