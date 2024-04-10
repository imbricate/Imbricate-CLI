/**
 * @author WMXPY
 * @namespace Configuration_Profile
 * @description Get Profile
 */

import { CLIProfileNotFound } from "../../error/profile/profile-not-found";
import { IConfigurationManager } from "../interface";

export const getProfileFromConfiguration = (
    configurationManager: IConfigurationManager,
    profileOverride?: string,
) => {

    if (typeof profileOverride === "string") {

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
