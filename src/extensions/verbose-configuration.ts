/**
 * @author WMXPY
 * @namespace Extensions
 * @description Verbose Configuration
 */

import { Command, Option } from "commander";
import { GlobalManager } from "../util/global-manager";

export const addVerboseConfigurationExtension = (
    program: Command,
    globalManager: GlobalManager,
): void => {

    const verboseConfigurationOption = new Option(
        "--verbose-configuration",
        "[DEBUG] verbose configuration file information",
    );

    // verboseConfigurationOption
    //     .hideHelp();

    program.addOption(verboseConfigurationOption);
    program.on("option:verbose-configuration", () => {

        globalManager.setVerboseConfiguration(true);
        console.log("Verbose Configuration");
    });
};
