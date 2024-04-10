/**
 * @author WMXPY
 * @namespace Commands_Config_Profile
 * @description Create
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIProfileAlreadyExists } from "../../../error/profile/profile-already-exists";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ConfigProfileCreateCommandOptions = {

    readonly quiet?: boolean;
};

export const createConfigProfileCreateCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new configuration profile")
        .option("-q, --quiet", "quite mode")
        .argument("<profile-name>", "the name of the profile")
        .action(createActionRunner(terminalController, async (
            profileName: string,
            options: ConfigProfileCreateCommandOptions,
        ): Promise<void> => {

            const profileNames: string[] = Object.keys(configurationManager.profiles);

            if (profileNames.includes(profileName)) {
                throw CLIProfileAlreadyExists.withProfileName(profileName);
            }

            await configurationManager.addProfile(profileName);

            if (!options.quiet) {
                terminalController.printInfo(`Profile ${profileName} created`);
            }
        }));

    return createCommand;
};
