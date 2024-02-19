/**
 * @author WMXPY
 * @namespace Options
 * @description Verbose Configuration
 */

import { Command, Option } from "commander";

export const addVerboseConfigurationOption = (program: Command): void => {

    const verboseConfigurationOption = new Option("--verbose-configuration", "[DEBUG] verbose configuration file information");
    verboseConfigurationOption
        .hideHelp();

    program.addOption(verboseConfigurationOption);
    program.on("option:verbose-configuration", () => {

        console.log("Verbose Configuration");
    });
};
