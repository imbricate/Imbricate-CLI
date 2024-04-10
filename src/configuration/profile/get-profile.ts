/**
 * @author WMXPY
 * @namespace Configuration_Profile
 * @description Get Profile
 */

import { CLIProfileNotFound } from "../../error/profile/profile-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { IConfigurationManager } from "../interface";

export const getProfileFromConfiguration = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
    quiet?: boolean,
) => {

    const profileOverride: string | null = globalManager.profileName;

    if (typeof profileOverride === "string") {

        if (!quiet) {
            terminalController.printInfo(`Using profile: ${profileOverride}`);
        }

        const result = configurationManager.getProfile(profileOverride);
        if (result) {
            return result;
        }

        throw CLIProfileNotFound.withProfileName(profileOverride);
    }

    const result = configurationManager.getDefaultProfile();
    if (result) {
        return result;
    }

    throw CLIProfileNotFound.withDefaultProfile();
};
