/**
 * @author WMXPY
 * @namespace Features
 * @description Run Command
 */

import { SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { executeCommand } from "../util/execute-command";

type RunCommandInput = {

    readonly commands: string[];
};

const createImplementation = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
) => {

    return async (
        input: RunCommandInput,
    ): Promise<void> => {

        if (!Array.isArray(input.commands)) {
            throw new Error("Commands is required to be an Array");
        }

        if (input.commands.length === 0) {
            throw new Error("Commands is required to be a non-empty Array");
        }

        await executeCommand(input.commands, terminalController);
    };
};

export const createRunCommandFeature = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): SandboxFeature => {

    return SandboxFeatureBuilder.providedByInterface()
        .withPackageName("execute")
        .withMethodName("runCommand")
        .withImplementation(createImplementation(
            globalManager,
            terminalController,
            configurationManager,
        ))
        .build();
};
