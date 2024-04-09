/**
 * @author WMXPY
 * @namespace Commands_Config_Editor
 * @description Use
 */

import { Command } from "commander";
import { ConfigurationEditorPreset, configurationEditorPresets } from "../../../configuration/editor/presets";
import { IConfigurationManager } from "../../../configuration/interface";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ConfigEditorUseCommandOptions = {

    readonly quiet?: boolean;
};

export const createConfigEditorUseCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const useCommand: Command = createConfiguredCommand("use");

    useCommand
        .description("use preset configuration for editor commands")
        .argument("<preset-name>", "the name of the preset configuration")
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            presetName: string,
            options: ConfigEditorUseCommandOptions,
        ): Promise<void> => {

            const preset: ConfigurationEditorPreset | undefined =
                configurationEditorPresets[presetName as keyof typeof configurationEditorPresets];

            if (!preset) {
                if (!options.quiet) {
                    terminalController.printErrorMessage(`Preset ${presetName} not found`);
                }
                return;
            }

            configurationManager.setEditPreset(preset);

            if (!options.quiet) {
                terminalController.printInfo(`Preset ${presetName} applied`);
            }
        }));

    return useCommand;
};
