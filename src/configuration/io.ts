/**
 * @author WMXPY
 * @namespace Configuration
 * @description IO
 */

import { IImbricateConfiguration, IRawImbricateConfiguration, concatConfigurationPath, getDefaultRawImbricateConfiguration, parseRawImbricateConfiguration } from "@imbricate/local-fundamental";
import { attemptMarkDir, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";
import { debugLog } from "../util/debug";
import { formatJSON } from "../util/format-json";

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

export const readCLIConfiguration = async (configurationPath: string): Promise<IImbricateConfiguration> => {

    const configurationFilePath: string = concatConfigurationPath(
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
