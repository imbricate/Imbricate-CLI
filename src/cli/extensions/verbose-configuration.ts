/**
 * @author WMXPY
 * @namespace CLI_Extensions
 * @description Verbose Configuration
 */

import { Command, Option } from "commander";
import { GlobalManager } from "../../util/global-manager";

export const addVerboseConfigurationExtension = (
    program: Command,
    globalManager: GlobalManager,
): void => {

    const verboseConfigurationOption = new Option(
        "-VC, --verbose-configuration",
        "[DEBUG] verbose configuration file information",
    );

    verboseConfigurationOption
        .hideHelp();

    program.addOption(verboseConfigurationOption);
    program.on("option:verbose-configuration", () => {

        globalManager.setVerboseConfiguration(true);
        console.log("Verbose Configuration");
    });
};
