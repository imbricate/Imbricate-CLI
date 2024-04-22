/**
 * @author WMXPY
 * @namespace Commands_Config_Editor
 * @description List
 */

import { Command } from "commander";
import { ConfigurationEditorPreset, configurationEditorPresets } from "../../../configuration/editor/presets";
import { IConfigurationManager } from "../../../configuration/interface";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ConfigEditorListCommandOptions = {

    readonly json?: boolean;
};

export const createConfigEditorListCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");
    listCommand.alias("ls");

    listCommand
        .description("list preset configuration for editor commands")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: ConfigEditorListCommandOptions,
        ): Promise<void> => {

            if (options.json) {

                terminalController.printJsonInfo(
                    configurationEditorPresets,
                );
                return;
            }

            const presetNames: string[] = Object.keys(configurationEditorPresets);

            const textOutput: string = presetNames
                .map((each: string) => {

                    const preset: ConfigurationEditorPreset = configurationEditorPresets[each as keyof typeof configurationEditorPresets];

                    return [
                        `|- Preset: ${each}`,
                        ` | Edit Command: ${preset.editCommand}`,
                        ` | Edit Hands Free Command: ${preset.editHandsFreeCommand}`,
                        ` | Diff Command: ${preset.diffCommand}`,
                    ].join("\n");
                })
                .join("\n");

            terminalController.printInfo(textOutput);
        }));

    return listCommand;
};
