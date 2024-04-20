/**
 * @author WMXPY
 * @namespace Extensions
 * @description Profile
 */

import { Command, Option } from "commander";
import { GlobalManager } from "../global/global-manager";

export const addProfileExtension = (
    program: Command,
    globalManager: GlobalManager,
): void => {

    const directoryOption = new Option(
        "-P, --profile <profile-name>",
        "specify the configuration profile name",
    );

    program.addOption(directoryOption);
    program.on("option:profile", (profileName: string) => {

        globalManager.setProfileName(profileName);
    });
};
