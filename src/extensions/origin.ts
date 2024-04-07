/**
 * @author WMXPY
 * @namespace Extensions
 * @description Origin
 */

import { Command, Option } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { CLIOriginNotFound } from "../error/origin/origin-not-found";
import { ITerminalController } from "../terminal/definition";

export const addOriginExtension = (
    program: Command,
    configurationManager: IConfigurationManager,
    terminalController: ITerminalController,
): void => {

    const originOption = new Option(
        "-o, --origin <origin-name>",
        "override current origin",
    );

    program.addOption(originOption);
    program.on("option:origin", (origin: string) => {

        for (const existingOrigin of configurationManager.origins) {

            if (existingOrigin.originName === origin) {

                configurationManager.setActiveOrigin(origin);

                terminalController.printInfo(`Override to origin: ${origin}`);
                return;
            }
        }

        throw CLIOriginNotFound.withOriginName(origin);
    });
};
