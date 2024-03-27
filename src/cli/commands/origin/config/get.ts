/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin_Config
 * @description Get
 */

import { Command } from "commander";
import { IImbricateOrigin } from "../../../../origin/interface";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIOriginNotFound } from "../../../error/origin/origin-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type OriginConfigGetCommandOptions = {

    readonly json?: boolean;
};

export const createOriginConfigGetCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const getCommand: Command = createConfiguredCommand("get");

    getCommand
        .description("show configuration of an origin")
        .option("-j, --json", "print result as JSON")
        .argument("<origin>", "origin name")
        .argument("<key>", "key of the configuration")
        .action(createActionRunner(terminalController, async (
            originName: string,
            key: string,
            options: OriginConfigGetCommandOptions,
        ): Promise<void> => {

            const origin: IImbricateOrigin | null =
                globalManager.getOrigin(originName);

            if (!origin) {
                throw CLIOriginNotFound.withOriginName(originName);
            }

            const value: string | undefined = origin.payloads[key];

            if (options.json) {

                terminalController.printInfo(JSON.stringify({
                    key,
                    exists: Boolean(value),
                    value,
                }, null, 2));
                return;
            }

            if (value) {
                terminalController.printInfo(`${key}=${value}`);
            }

            terminalController.printInfo(`Key: ${key} not found in origin: ${originName}`);
            return;
        }));

    return getCommand;
};
