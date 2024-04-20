/**
 * @author WMXPY
 * @namespace Configuration
 * @description IO
 */

import { attemptMarkDir, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";
import { debugLog } from "../util/debug";
import { resolveDirectory } from "../util/fix-directory";
import { formatJSON } from "../util/format-json";
import { IImbricateConfiguration } from "./definition";
import { parseRawImbricateConfiguration } from "./parse";
import { IRawImbricateConfiguration, getDefaultRawImbricateConfiguration } from "./raw-definition";

const createOrGetFile = async (
    path: string,
    defaultValue: string,
): Promise<string> => {

    const fileExist: boolean = await pathExists(path);

    debugLog("File Exist", fileExist);

    if (fileExist) {
        return await readTextFile(path);
    }

    const folderPath = Path.dirname(path);

    await attemptMarkDir(folderPath);
    await writeTextFile(path, defaultValue);

    return defaultValue;
};

export const resolveCLIConfigurationPath = (configurationPath: string): string => {

    return resolveDirectory(
        configurationPath,
        "imbricate.config.json",
    );
};

export const readCLIConfiguration = async (configurationPath: string): Promise<IImbricateConfiguration> => {

    const configurationFilePath: string = resolveCLIConfigurationPath(
        configurationPath,
    );

    debugLog("Configuration File Path", configurationFilePath);

    const configurationText: string = await createOrGetFile(
        configurationFilePath,
        formatJSON(getDefaultRawImbricateConfiguration()),
    );

    const configuration: IRawImbricateConfiguration = JSON.parse(configurationText);
    const parsedConfiguration: IImbricateConfiguration =
        parseRawImbricateConfiguration(configuration);

    return parsedConfiguration;
};
