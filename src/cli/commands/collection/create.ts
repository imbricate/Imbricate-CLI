/**
 * @author WMXPY
 * @namespace CLI_Commands_Collection
 * @description Create
 */

import { Command } from "commander";
import { GlobalManager } from "../../../util/global-manager";

type CollectionCreateCommandOptions = {

    readonly quiet?: boolean;
};

export const createCollectionCreateCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("create");
    callCommand
        .description("Control collections")
        .argument("<api-name>", "API name")
        .option("-q, --quiet", "run in quiet mode")
        .action(async (apiName, options: CollectionCreateCommandOptions): Promise<void> => {

            console.log("Collection Create", apiName, options, globalManager.workingDirectory);
        });

    return callCommand;
};
