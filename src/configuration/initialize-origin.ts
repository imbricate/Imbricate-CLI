/**
 * @author WMXPY
 * @namespace Configuration
 * @description Initialize Origin
 */

import { IImbricateOrigin } from "@imbricate/core";
import { GlobalManager } from "../global/global-manager";
import { debugLog } from "../util/debug";
import { IConfigurationManager } from "./interface";

export const initializeOrigin = async (
    globalManager: GlobalManager,
    configurationManager: IConfigurationManager,
): Promise<void> => {

    debugLog("Configuration Loaded", configurationManager.configurationPath);

    for (const originConfig of configurationManager.origins) {

        const origin: IImbricateOrigin =
            await configurationManager.reconstructOrigin(
                originConfig.originType,
                originConfig,
            );

        globalManager.originManager.putOrigin(originConfig.originName, origin);
    }

    globalManager.setActiveOrigin(configurationManager.activeOrigin);
    return;
};
