/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description Use
 */

import { Command } from "commander";
import { GlobalManagerOriginResponse } from "../../global/definition";
import { GlobalManager } from "../../global/global-manager";
import { createConfiguredCommand } from "../../util/command";

type OriginUseCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginUseCommand = (
    globalManager: GlobalManager,
): Command => {

    const useCommand: Command = createConfiguredCommand("use");

    useCommand
        .description("set specific origin as current origin")
        .option("-q, --quiet", "quite mode")
        .action(async (
            _options: OriginUseCommandOptions,
        ): Promise<void> => {

            const origins: GlobalManagerOriginResponse[] = globalManager.origins;

            console.log(origins);

            return;
        });

    return useCommand;
};
