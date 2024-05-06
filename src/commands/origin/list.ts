/**
 * @author WMXPY
 * @namespace Commands_Origin
 * @description List
 */

import { ImbricateOriginManagerOriginResponse } from "@imbricate/local-fundamental";
import { Command } from "commander";
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
    listCommand.alias("ls");

    listCommand
        .description("list available origins")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: OriginListCommandOptions,
        ): Promise<void> => {

            if (options.json) {

                terminalController.printJsonInfo(
                    globalManager.originManager.origins.map((originResponse: ImbricateOriginManagerOriginResponse) => {

                        const active: boolean = globalManager.activeOrigin === originResponse.originName;

                        return {
                            active,
                            originName: originResponse.originName,
                            type: originResponse.origin.originType,
                            payloads: originResponse.origin.payloads,
                        };
                    }),
                );
                return;
            }

            if (globalManager.originManager.origins.length === 0) {
                terminalController.printInfo("No origins found");
                return;
            }

            terminalController.printInfo(globalManager.originManager.origins
                .map((originResponse: ImbricateOriginManagerOriginResponse) => {

                    const active: boolean = globalManager.activeOrigin === originResponse.originName;

                    if (active) {
                        return `${originResponse.originName} [Active]`;
                    }

                    return originResponse.originName;
                }).join("\n"));

            return;
        }));

    return listCommand;
};
