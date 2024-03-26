/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Collection
 */

import { Command } from "commander";
import { GlobalManager } from "../../util/global-manager";

type CollectionCommandOptions = {

    readonly quiet?: boolean;
};

export const createCollectionCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("collection");
    callCommand
        .description("Control collections")
        .argument("<api-name>", "API name")
        .option("-q, --quiet", "run in quiet mode")
        .action(async (apiName, options: CollectionCommandOptions): Promise<void> => {

            console.log("Collection", apiName, options, globalManager.workingDirectory);
        });

    return callCommand;
};
