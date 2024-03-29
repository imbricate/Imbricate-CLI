/**
 * @author WMXPY
 * @namespace Commands_Origin_Config
 * @description Set
 */

import { IImbricateOrigin } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIOriginNotFound } from "../../../error/origin/origin-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type OriginConfigSetCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginConfigSetCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const setCommand: Command = createConfiguredCommand("set");

    setCommand
        .description("set a configuration of an origin")
        .option("-q, --quiet", "quite mode")
        .argument("<origin>", "origin name")
        .argument("<key>", "key of the configuration")
        .argument("<value>", "value of the configuration")
        .action(createActionRunner(terminalController, async (
            originName: string,
            key: string,
            value: string,
            options: OriginConfigSetCommandOptions,
        ): Promise<void> => {

            const origin: IImbricateOrigin | null =
                globalManager.getOrigin(originName);

            if (!origin) {
                throw CLIOriginNotFound.withOriginName(originName);
            }

            configurationManager.updateOrigin(originName, {
                originName,
                type: origin.metadata.type,
                payloads: {
                    ...origin.payloads,
                    [key]: value,
                },
            });

            if (!options.quiet) {
                terminalController.printInfo(
                    `Set configuration of origin: ${originName}, ${key}=${value}`,
                );
            }
            return;
        }));

    return setCommand;
};
