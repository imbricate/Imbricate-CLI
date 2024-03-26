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
        .description("create a new collection")
        .argument("<collection-name>", "Name of the collection")
        .action(async (
            collectionName: string,
            options: CollectionCreateCommandOptions,
        ): Promise<void> => {

            console.log("Collection Create", collectionName, options, globalManager.workingDirectory);
        });

    return callCommand;
};
