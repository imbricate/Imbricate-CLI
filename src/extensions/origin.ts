/**
 * @author WMXPY
 * @namespace Extensions
 * @description Origin
 */

import { Command, Option } from "commander";
import { CLIOriginNotFound } from "../error/origin/origin-not-found";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";

export const addOriginExtension = (
    program: Command,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
): void => {

    const originOption = new Option(
        "-o, --origin <origin-name>",
        "override current origin",
    );

    program.addOption(originOption);
    program.on("option:origin", (origin: string) => {

        for (const existingOrigin of globalManager.origins) {

            if (existingOrigin.originName === origin) {

                globalManager.setActiveOrigin(origin);

                terminalController.printInfo(`Override to origin: ${origin}`);
                return;
            }
        }

        throw CLIOriginNotFound.withOriginName(origin);
    });
};
