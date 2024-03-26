/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Initialize Origin
 */

import { FileSystemImbricateOrigin } from "../../origin-implementation/file-system/origin";
import { MongoImbricateOrigin } from "../../origin-implementation/mongo/origin";
import { IImbricateOrigin } from "../../origin/interface";
import { GlobalManager } from "../global/global-manager";
import { debugLog } from "../util/debug";
import { ConfigurationManager } from "./configuration-manager";
import { IImbricateConfigurationOrigin } from "./raw-definition";

const resolveOriginFromConfiguration = (originConfig: IImbricateConfigurationOrigin): IImbricateOrigin => {

    switch (originConfig.type) {

        case "file-system":
            return FileSystemImbricateOrigin.withBasePath(originConfig.payloads.basePath);
        case "mongo":
            return new MongoImbricateOrigin();
    }

    throw new Error("Unknown origin type");
};

export const initializeOrigin = async (
    globalManager: GlobalManager,
    configurationManager: ConfigurationManager,
): Promise<void> => {

    debugLog("Configuration Loaded", configurationManager.configurationPath);

    configurationManager.origins.forEach((originConfig: IImbricateConfigurationOrigin) => {

        const origin: IImbricateOrigin = resolveOriginFromConfiguration(originConfig);

        globalManager.putOrigin(originConfig.originName, origin);
    });

    return;
};
