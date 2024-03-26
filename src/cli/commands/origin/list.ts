/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description List
 */

import { Command } from "commander";
import { GlobalManagerOriginResponse } from "../../global/definition";
import { GlobalManager } from "../../global/global-manager";
import { createConfiguredCommand } from "../../util/command";
import { printInfo } from "../../util/log";

type OriginListCommandOptions = {

    readonly json?: boolean;
};

export const createOriginListCommand = (
    globalManager: GlobalManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");

    listCommand
        .description("list available origins")
        .option("-j, --json", "Print as JSON")
        .action(async (
            options: OriginListCommandOptions,
        ): Promise<void> => {

            if (options.json) {

                printInfo(JSON.stringify(globalManager.origins
                    .map((originResponse: GlobalManagerOriginResponse) => {
                        return {
                            originName: originResponse.originName,
                            type: originResponse.origin.metadata.type,
                            payloads: originResponse.origin.payloads,
                        };
                    }), null, 2));
                return;
            }

            printInfo(globalManager.origins
                .map((originResponse: GlobalManagerOriginResponse) => {
                    return originResponse.originName;
                }).join("\n"));

            return;
        });

    return listCommand;
};
