/**
 * @author WMXPY
 * @namespace Extensions
 * @description Origin
 */

import { Command, Option } from "commander";
import { IConfigurationManager } from "../configuration/interface";

export const addOriginExtension = (
    program: Command,
    configurationManager: IConfigurationManager,
): void => {

    const originOption = new Option(
        "-o, --origin <origin-name>",
        "override current origin",
    );

    program.addOption(originOption);
    program.on("option:origin", (origin: string) => {

        console.log(configurationManager.activeOrigin);

        console.log(origin);
    });
};
