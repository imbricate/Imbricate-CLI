/**
 * @author WMXPY
 * @namespace Commands_Origin
 * @description Use
 */

import { ImbricateOriginManagerOriginResponse } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIOriginNotFound } from "../../error/origin/origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type OriginUseCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginUseCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const useCommand: Command = createConfiguredCommand("use");

    useCommand
        .description("set specific origin as current origin")
        .option("-q, --quiet", "quite mode")
        .argument("<origin>", "origin name")
        .action(createActionRunner(terminalController, async (
            originName: string,
            _options: OriginUseCommandOptions,
        ): Promise<void> => {

            const origins: ImbricateOriginManagerOriginResponse[] = globalManager.originManager.origins;

            let targetOrigin: ImbricateOriginManagerOriginResponse | null = null;

            for (const origin of origins) {
                if (origin.originName === originName) {
                    targetOrigin = origin;
                    break;
                }
            }

            if (targetOrigin === null) {

                throw CLIOriginNotFound.withOriginName(originName);
            }

            configurationManager.setActiveOrigin(targetOrigin.originName);
            terminalController.printInfo(`Active origin updated: ${targetOrigin.originName}`);

            return;
        }));

    return useCommand;
};
