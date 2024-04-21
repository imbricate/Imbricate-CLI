/**
 * @author WMXPY
 * @namespace Commands_Origin
 * @description Delete
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { IImbricateConfigurationOrigin } from "../../configuration/raw-definition";
import { CLIOriginIsActive } from "../../error/origin/origin-is-active";
import { CLIOriginNotFound } from "../../error/origin/origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type OriginDeleteCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginDeleteCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const deleteCommand: Command = createConfiguredCommand("delete");

    deleteCommand
        .description("delete an existing origin")
        .option("-q, --quiet", "quite mode")
        .argument("<origin-name>", "origin name")
        .action(createActionRunner(terminalController, async (
            originName: string,
            options: OriginDeleteCommandOptions,
        ): Promise<void> => {

            const originNames: string[] = configurationManager.origins
                .map((origin: IImbricateConfigurationOrigin) => {
                    return origin.originName;
                });

            if (!originNames.includes(originName)) {
                throw CLIOriginNotFound.withOriginName(originName);
            }

            if (configurationManager.activeOrigin === originName) {
                throw CLIOriginIsActive.withOriginName(originName);
            }

            await configurationManager.deleteOrigin(originName);

            if (!options.quiet) {
                terminalController.printInfo(`Origin ${originName} deleted`);
            }
        }));

    return deleteCommand;
};
