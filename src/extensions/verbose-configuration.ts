/**
 * @author WMXPY
 * @namespace Extensions
 * @description Verbose Configuration
 */

import { Command, Option } from "commander";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";

export const addVerboseConfigurationExtension = (
    program: Command,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
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
        terminalController.printInfo("Verbose Configuration");
    });
};
