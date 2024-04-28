/**
 * @author WMXPY
 * @namespace Commands_Collection
 * @description Delete
 */

import { IImbricateOrigin, IImbricateOriginCollection, ImbricatePageSnapshot } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotEmpty } from "../../error/collection/collection-not-empty";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type CollectionDeleteCommandOptions = {

    readonly quiet?: boolean;
};

export const createCollectionDeleteCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const deleteCommand: Command = createConfiguredCommand("delete");
    deleteCommand.alias("rm");

    deleteCommand
        .description("delete a existing collection")
        .option("-q, --quiet", "quite mode")
        .argument("<collection-name>", "name of the collection")
        .action(createActionRunner(terminalController, async (
            collectionName: string,
            options: CollectionDeleteCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const hasCollection: boolean = await currentOrigin.hasCollection(collectionName);

            if (!hasCollection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const collection: IImbricateOriginCollection | null = await currentOrigin.getCollection(collectionName);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const pages: ImbricatePageSnapshot[] = await collection.listPages([], false);
            const directories: string[] = await collection.listDirectories([]);

            if (pages.length !== 0 || directories.length !== 0) {

                if (!options.quiet) {
                    terminalController.printErrorMessage(`Collection ${collectionName} has pages or directories, a collection with pages or directories cannot be deleted`);
                }

                throw CLICollectionNotEmpty.withCollectionName(collectionName);
            }

            await currentOrigin.deleteCollection(collectionName);

            if (!options.quiet) {
                terminalController.printInfo(`Collection ${collectionName} deleted`);
            }
        }));

    return deleteCommand;
};
