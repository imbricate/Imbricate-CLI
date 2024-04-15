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

export const prepareInterfaceFeatures = (
    currentOrigin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): SandboxFeature[] => {

    const interfaceFeatures: SandboxFeature[] = [
        ...createIOFeatures(terminalController),
        createOpenPageFeature(currentOrigin, globalManager, terminalController, _configurationManager),
    ];

    return interfaceFeatures;
};
