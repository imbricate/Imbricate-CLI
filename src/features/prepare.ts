/**
 * @author WMXPY
 * @namespace Features
 * @description Prepare
 */

import { IImbricateOrigin, SandboxFeature } from "@imbricate/core";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createIOFeatures } from "./io";
import { createOpenPageFeature } from "./open-page";
import { createOpenScriptFeature } from "./open-script";

export const prepareInterfaceFeatures = (
    currentOrigin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): SandboxFeature[] => {

    const interfaceFeatures: SandboxFeature[] = [
        ...createIOFeatures(
            terminalController,
        ),
        createOpenPageFeature(
            currentOrigin,
            globalManager,
            terminalController,
            configurationManager,
        ),
        createOpenScriptFeature(
            currentOrigin,
            globalManager,
            terminalController,
            configurationManager,
        ),
    ];

    return interfaceFeatures;
};
