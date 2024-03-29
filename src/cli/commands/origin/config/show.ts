/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin_Config
 * @description Show
 */

import { IImbricateOrigin } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIOriginNotFound } from "../../../error/origin/origin-not-found";
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

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show configuration of an origin")
        .option("-j, --json", "print result as JSON")
        .argument("<origin>", "origin name")
        .action(createActionRunner(terminalController, async (
            originName: string,
            options: OriginConfigShowCommandOptions,
        ): Promise<void> => {

            const origin: IImbricateOrigin | null =
                globalManager.getOrigin(originName);

            if (!origin) {
                throw CLIOriginNotFound.withOriginName(originName);
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

    return showCommand;
};
