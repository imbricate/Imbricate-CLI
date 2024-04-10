/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Profile
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createConfigProfileCreateCommand } from "./profile/create";
import { createConfigProfileDeleteCommand } from "./profile/delete";
import { createConfigProfileListCommand } from "./profile/list";

export const createConfigProfileCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const profileCommand: Command = createConfiguredCommand("profile");

    profileCommand
        .description("manage imbricate profile configurations");

    profileCommand.addCommand(createConfigProfileCreateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    profileCommand.addCommand(createConfigProfileDeleteCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    profileCommand.addCommand(createConfigProfileListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return profileCommand;
};
