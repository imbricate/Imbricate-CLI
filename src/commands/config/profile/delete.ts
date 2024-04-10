/**
 * @author WMXPY
 * @namespace Commands_Config_Profile
 * @description Delete
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIProfileIsDefault } from "../../../error/profile/profile-is-default";
import { CLIProfileNotFound } from "../../../error/profile/profile-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ConfigProfileDeleteCommandOptions = {

    readonly quiet?: boolean;
};

export const createConfigProfileDeleteCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const deleteCommand: Command = createConfiguredCommand("delete");

    deleteCommand
        .description("delete a non-default configuration profile")
        .option("-q, --quiet", "quite mode")
        .argument("<profile-name>", "the name of the profile")
        .action(createActionRunner(terminalController, async (
            profileName: string,
            options: ConfigProfileDeleteCommandOptions,
        ): Promise<void> => {

            const profileNames: string[] = Object.keys(configurationManager.profiles);

            if (!profileNames.includes(profileName)) {
                throw CLIProfileNotFound.withProfileName(profileName);
            }

            if (profileName === configurationManager.defaultProfile) {
                throw CLIProfileIsDefault.withProfileName(profileName);
            }

            await configurationManager.deleteProfile(profileName);

            if (!options.quiet) {
                terminalController.printInfo(`Profile ${profileName} deleted`);
            }
        }));

    return deleteCommand;
};
