/**
 * @author WMXPY
 * @namespace Commands
 * @description Call
 */

import { Command } from "commander";
import { CommandCommonOptions } from "../definition/options";
import { getDirectory } from "../util/get-directory";

type CallCommandOptions = {

    // PLACEHOLDER
} & CommandCommonOptions;

export const callCommand = new Command("call");
callCommand
    .description("Call API")
    .argument("<api-name>", "API name")
    .action(async (apiName, options: CallCommandOptions): Promise<void> => {

        const directory: string = getDirectory(options);

        console.log("Call", apiName, directory);
    });
