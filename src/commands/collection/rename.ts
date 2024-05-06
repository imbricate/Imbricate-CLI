/**
 * @author WMXPY
 * @namespace Commands_Collection
 * @description Rename
 */

import { IImbricateOrigin, IImbricateOriginCollection } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionAlreadyExists } from "../../error/collection/collection-already-exists";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type CollectionRenameCommandOptions = {

    readonly description?: string;
    readonly quiet?: boolean;
};

export const createCollectionRenameCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const renameCommand: Command = createConfiguredCommand("rename");

    renameCommand
        .description("create a new collection")
        .option("-d, --description <description>", "description of the collection")
        .option("-q, --quiet", "quite mode")
        .argument("<collection-name>", "name of the existing collection")
        .argument("<new-collection-name>", "name of the new collection")
        .action(createActionRunner(terminalController, async (
            collectionName: string,
            newCollectionName: string,
            options: CollectionRenameCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const currentCollection: IImbricateOriginCollection | null =
                await currentOrigin.findCollection(collectionName);

            if (!currentCollection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const hasNewCollection: boolean = await currentOrigin.hasCollection(newCollectionName);

            if (hasNewCollection) {
                throw CLICollectionAlreadyExists.withCollectionName(newCollectionName);
            }

            await currentOrigin.renameCollection(
                currentCollection.uniqueIdentifier,
                newCollectionName,
            );

            if (!options.quiet) {
                terminalController.printInfo(`Collection renamed from '${collectionName}' to '${newCollectionName}'`);
            }
        }));

    return renameCommand;
};
