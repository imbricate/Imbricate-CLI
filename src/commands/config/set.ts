/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Set
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ConfigSetCommandOptions = {

    readonly quiet?: boolean;
};

export const createConfigSetCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const setCommand: Command = createConfiguredCommand("set");

    setCommand
        .description("set imbricate configuration from key and value")
        .argument("<config-key>", "the key of the configuration")
        .argument("<config-value>", "the value of the configuration")
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            key: string,
            value: string,
            options: ConfigSetCommandOptions,
        ): Promise<void> => {


            switch (key) {

                case "editCommand": {
                    configurationManager.setEditCommand(value);
                    break;
                }
                case "editHandsFreeCommand": {
                    configurationManager.setHandsFreeEditCommand(value);
                    break;
                }
                case "diffCommand": {
                    configurationManager.setDiffCommand(value);
                    break;
                }
                default: {
                    if (!options.quiet) {
                        terminalController.printErrorMessage(`Configuration ${key} not found`);
                    }
                    return;
                }
            }

            if (!options.quiet) {
                terminalController.printInfo(`Configuration ${key} set to ${value}`);
            }
        }));

    return setCommand;
};
