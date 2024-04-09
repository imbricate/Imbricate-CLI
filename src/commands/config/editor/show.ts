/**
 * @author WMXPY
 * @namespace Commands_Config_Editor
 * @description Show
 */

import { Command } from "commander";
import { ConfigurationEditorPreset, configurationEditorPresets } from "../../../configuration/editor/presets";
import { IConfigurationManager } from "../../../configuration/interface";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ConfigEditorShowCommandOptions = {

    readonly json?: boolean;
};

export const createConfigEditorShowCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show preset configuration for editor commands")
        .argument("<preset-name>", "the name of the preset configuration")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            presetName: string,
            options: ConfigEditorShowCommandOptions,
        ): Promise<void> => {

            const preset: ConfigurationEditorPreset | undefined =
                configurationEditorPresets[presetName as keyof typeof configurationEditorPresets];

            if (!preset) {

                if (!options.json) {

                    terminalController.printErrorMessage(`Preset ${presetName} not found`);
                } else {

                    terminalController.printErrorMessage(JSON.stringify({
                        presetName: presetName,
                        editCommand: "[Undefined]",
                        editHandsFreeCommand: "[Undefined]",
                        diffCommand: "[Undefined]",
                        message: `Preset ${presetName} not found`,
                    }, null, 2));
                }
                return;
            }

            if (options.json) {

                terminalController.printInfo(JSON.stringify({
                    presetName: presetName,
                    editCommand: preset.editCommand,
                    editHandsFreeCommand: preset.editHandsFreeCommand,
                    diffCommand: preset.diffCommand,
                }, null, 2));
                return;
            }

            terminalController.printInfo([
                `Edit Command: ${preset.editCommand}`,
                `Hands Free Edit Command: ${preset.editHandsFreeCommand}`,
                `Diff Command: ${preset.diffCommand}`,
            ].join("\n"));
        }));

    return showCommand;
};
