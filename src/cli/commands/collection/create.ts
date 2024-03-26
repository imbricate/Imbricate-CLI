/**
 * @author WMXPY
 * @namespace CLI_Commands_Collection
 * @description Create
 */

import { Command } from "commander";
import { ConfigurationManager } from "../../configuration/configuration-manager";
import { GlobalManager } from "../../global/global-manager";
import { createConfiguredCommand } from "../../util/command";

type CollectionCreateCommandOptions = {

    readonly quiet?: boolean;
};

export const createCollectionCreateCommand = (
    globalManager: GlobalManager,
    configurationManager: ConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new collection")
        .option("-q, --quiet", "quite mode")
        .argument("<collection-name>", "Name of the collection")
        .action(async (
            collectionName: string,
            options: CollectionCreateCommandOptions,
        ): Promise<void> => {

            console.log("Collection Create", collectionName, options, globalManager.workingDirectory);

            configurationManager.origins;
        });

    return createCommand;
};
