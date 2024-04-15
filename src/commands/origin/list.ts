/**
 * @author WMXPY
 * @namespace Commands_Origin
 * @description List
 */

import { Command } from "commander";
import { GlobalManagerOriginResponse } from "../../global/definition";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type OriginListCommandOptions = {

    readonly json?: boolean;
};

export const createOriginListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");

    listCommand
        .description("list available origins")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: OriginListCommandOptions,
        ): Promise<void> => {

            if (options.json) {

                terminalController.printJsonInfo(
                    globalManager.origins.map((originResponse: GlobalManagerOriginResponse) => {
                        return {
                            active: originResponse.active,
                            originName: originResponse.originName,
                            type: originResponse.origin.metadata.type,
                            payloads: originResponse.origin.payloads,
                        };
                    }),
                );
                return;
            }

            if (globalManager.origins.length === 0) {
                terminalController.printInfo("No origins found");
                return;
            }

            terminalController.printInfo(globalManager.origins
                .map((originResponse: GlobalManagerOriginResponse) => {

                    if (originResponse.active) {
                        return `${originResponse.originName} [Active]`;
                    }

                    return originResponse.originName;
                }).join("\n"));

            return;
        }));

    return listCommand;
};
