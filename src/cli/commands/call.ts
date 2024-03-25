/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Call
 */

import { Command } from "commander";
import { GlobalManager } from "../../util/global-manager";

type CallCommandOptions = {

    readonly quiet?: boolean;
};

export const createCallCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("call");
    callCommand
        .description("Call API")
        .argument("<api-name>", "API name")
        .option("-q, --quiet", "run in quiet mode")
        .action(async (apiName, options: CallCommandOptions): Promise<void> => {

            console.log("Call", apiName, options, globalManager.workingDirectory);
        });

    return callCommand;
};
