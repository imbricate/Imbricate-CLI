/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin_Config
 * @description Show
 */

import { Command } from "commander";
import { IImbricateOrigin } from "../../../../origin/interface";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type OriginConfigShowCommandOptions = {

    readonly json?: boolean;
};

export const createOriginConfigShowCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const fileSystem: Command = createConfiguredCommand("show");

    fileSystem
        .description("show configuration of an origin")
        .option("-j, --json", "print result as JSON")
        .argument("<origin>", "origin name")
        .action(createActionRunner(terminalController, async (
            originName: string,
            options: OriginConfigShowCommandOptions,
        ): Promise<void> => {

            const origin: IImbricateOrigin | null =
                globalManager.findCurrentOrigin();

            if (!origin) {
                throw CLIActiveOriginNotFound.create();
            }

            if (options.json) {

                terminalController.printInfo(JSON.stringify({
                    ...origin.payloads,
                }, null, 2));
                return;
            }

            terminalController.printInfo(
                Object.keys(origin.payloads).map((key: string) => {
                    return `${key}=${origin.payloads[key]}`;
                }).join("\n"),
            );
            return;
        }));

    return fileSystem;
};
