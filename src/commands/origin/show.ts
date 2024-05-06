/**
 * @author WMXPY
 * @namespace Commands_Origin
 * @description Show
 */

import { IImbricateConfigurationOrigin } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIOriginNotFound } from "../../error/origin/origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type OriginShowCommandOptions = {

    readonly json?: boolean;
};

export const createOriginShowCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("delete an existing origin")
        .option("-j, --json", "print result as JSON")
        .argument("<origin-name>", "origin name")
        .action(createActionRunner(terminalController, async (
            originName: string,
            options: OriginShowCommandOptions,
        ): Promise<void> => {

            const targetOriginConfig: IImbricateConfigurationOrigin | undefined =
                configurationManager.origins
                    .find((origin: IImbricateConfigurationOrigin) => {
                        return origin.originName === originName;
                    });

            if (!targetOriginConfig) {
                throw CLIOriginNotFound.withOriginName(originName);
            }

            if (options.json) {
                terminalController.printJsonInfo(targetOriginConfig);
                return;
            }

            terminalController.printInfo(`Origin: ${targetOriginConfig.originName}`);
            terminalController.printInfo(`Type: ${targetOriginConfig.originType}`);
            terminalController.printInfo(`Unique Identifier: ${targetOriginConfig.uniqueIdentifier}`);
        }));

    return showCommand;
};
