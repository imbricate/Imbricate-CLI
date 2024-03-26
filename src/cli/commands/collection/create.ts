/**
 * @author WMXPY
 * @namespace CLI_Commands_Collection
 * @description Create
 */

import { Command } from "commander";
import { GlobalManager } from "../../global/global-manager";

type CollectionCreateCommandOptions = {

    readonly quiet?: boolean;
};

export const createCollectionCreateCommand = (
    globalManager: GlobalManager,
): Command => {

    const createCommand = new Command("create");
    createCommand.configureHelp({
        showGlobalOptions: true,
    });

    createCommand
        .description("create a new collection")
        .option("-q, --quiet", "quite mode")
        .argument("<collection-name>", "Name of the collection")
        .action(async (
            collectionName: string,
            options: CollectionCreateCommandOptions,
        ): Promise<void> => {

            console.log("Collection Create", collectionName, options, globalManager.workingDirectory);
        });

    return createCommand;
};
