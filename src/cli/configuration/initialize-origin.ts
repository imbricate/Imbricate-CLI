/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Initialize Origin
 */

import { IImbricateOrigin } from "../../origin/interface";
import { GlobalManager } from "../global/global-manager";
import { debugLog } from "../util/debug";
import { IConfigurationManager } from "./interface";
import { IImbricateConfigurationOrigin } from "./raw-definition";

export const initializeOrigin = async (
    globalManager: GlobalManager,
    configurationManager: IConfigurationManager,
): Promise<void> => {

    debugLog("Configuration Loaded", configurationManager.configurationPath);

    configurationManager.origins.forEach((originConfig: IImbricateConfigurationOrigin) => {

        const origin: IImbricateOrigin = configurationManager.reconstructOrigin(
            originConfig.type,
            originConfig,
        );

        globalManager.putOrigin(originConfig.originName, origin);
    });

    globalManager.setActiveOrigin(configurationManager.activeOrigin);
    return;
};
