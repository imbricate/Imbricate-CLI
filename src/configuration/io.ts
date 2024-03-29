/**
 * @author WMXPY
 * @namespace Configuration
 * @description IO
 */

import { attemptMarkDir, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";
import { debugLog } from "../util/debug";
import { resolveDirectory } from "../util/fix-directory";
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

export const readCLIConfiguration = async (configurationPath: string): Promise<IImbricateConfiguration> => {

    const configurationFilePath: string = resolveDirectory(
        configurationPath,
        "imbricate.config.json",
    );

    debugLog("Configuration File Path", configurationFilePath);

    const configurationText: string = await createOrGetFile(
        configurationFilePath,
        JSON.stringify(getDefaultRawImbricateConfiguration(), null, 2),
    );

    const configuration: IRawImbricateConfiguration = JSON.parse(configurationText);
    const parsedConfiguration: IImbricateConfiguration =
        parseRawImbricateConfiguration(configuration);

    return parsedConfiguration;
};
