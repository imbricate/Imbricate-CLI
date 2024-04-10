/**
 * @author WMXPY
 * @namespace Commands_Config_Profile
 * @description Default
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIProfileNotFound } from "../../../error/profile/profile-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ConfigProfileDefaultCommandOptions = {

    readonly quiet?: boolean;
};

export const createConfigProfileDefaultCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const defaultCommand: Command = createConfiguredCommand("default");

    defaultCommand
        .description("make a configuration profile as default")
        .option("-q, --quiet", "quite mode")
        .argument("<profile-name>", "the name of the profile")
        .action(createActionRunner(terminalController, async (
            profileName: string,
            options: ConfigProfileDefaultCommandOptions,
        ): Promise<void> => {

            const profileNames: string[] = Object.keys(configurationManager.profiles);

            if (!profileNames.includes(profileName)) {
                throw CLIProfileNotFound.withProfileName(profileName);
            }

            await configurationManager.setDefaultProfile(profileName);

            if (!options.quiet) {
                terminalController.printInfo(`Profile ${profileName} set as default`);
            }
        }));

    return defaultCommand;
};
