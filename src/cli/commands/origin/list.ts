/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description List
 */

import { Command } from "commander";
import { GlobalManager } from "../../../util/global-manager";
import { GlobalManagerOriginResponse } from "../../../util/global-manager/definition";

type OriginListCommandOptions = {

    readonly json?: boolean;
};

export const createOriginListCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("list");
    callCommand
        .description("list available origins")
        .option("-j, --json", "Print as JSON")
        .action(async (
            options: OriginListCommandOptions,
        ): Promise<void> => {

            if (options.json) {

                console.log(JSON.stringify(globalManager.origins
                    .map((originResponse: GlobalManagerOriginResponse) => {
                        return {
                            originName: originResponse.originName,
                            type: originResponse.origin.metadata.type,
                            payloads: originResponse.origin.payloads,
                        };
                    }), null, 2));
                return;
            }

            console.log(globalManager.origins
                .map((originResponse: GlobalManagerOriginResponse) => {
                    return originResponse.originName;
                }).join("\n"));

            return;
        });

    return callCommand;
};
