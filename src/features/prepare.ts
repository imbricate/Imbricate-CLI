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
import { createRunCommandFeature } from "./run-command";
import { createSendHttpRequestFeature } from "./send-http-request";
import { createStartPageEditingFeature } from "./start-page-editing";

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
        createRunCommandFeature(
            globalManager,
            terminalController,
            configurationManager,
        ),
        createSendHttpRequestFeature(
            globalManager,
            terminalController,
            configurationManager,
        ),
        createStartPageEditingFeature(
            currentOrigin,
            globalManager,
            terminalController,
            configurationManager,
        ),
    ];

    return interfaceFeatures;
};
