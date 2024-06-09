/**
 * @author WMXPY
 * @namespace Features
 * @description Open Script
 */

import { IImbricateOrigin, IImbricateScript, SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";
import { SAVING_TARGET_TYPE, SavingTarget } from "@imbricate/local-fundamental";
import { IConfigurationManager } from "../configuration/interface";
import { getProfileFromConfiguration } from "../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../configuration/profile/profile-manager";
import { openContentAndMonitor } from "../editing/open-file";
import { createScriptSavingTarget } from "../editing/saving-target/create-saving.target";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";

type OpenScriptInput = {

    readonly identifier: string;

    readonly handsFree?: boolean;
};

const createImplementation = (
    origin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
) => {

    return async (
        input: OpenScriptInput,
    ): Promise<void> => {

        if (typeof input.identifier !== "string") {
            throw new Error("Identifier is required");
        }

        const script: IImbricateScript | null = await origin
            .getScriptManager()
            .getScript(input.identifier);

        if (!script) {
            throw new Error(`Script [${input.identifier}] not found`);
        }

        const profile: ConfigurationProfileManager = getProfileFromConfiguration(
            globalManager,
            terminalController,
            configurationManager,
        );

        const scriptContent: string = await script.readScript();
        const target: SavingTarget<SAVING_TARGET_TYPE.SCRIPT> = createScriptSavingTarget(
            globalManager,
            script.identifier,
        );

        await openContentAndMonitor(
            scriptContent,
            `${script.scriptName}.js`,
            target,
            globalManager,
            terminalController,
            profile,
            input.handsFree ?? true,
        );
    };
};

export const createOpenScriptFeature = (
    origin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): SandboxFeature => {

    return SandboxFeatureBuilder.providedByInterface()
        .withPackageName("script")
        .withMethodName("openScript")
        .withImplementation(createImplementation(
            origin,
            globalManager,
            terminalController,
            configurationManager,
        ))
        .build();
};
