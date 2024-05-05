/**
 * @author WMXPY
 * @namespace Commands_Collection_Config
 * @description Show
 */

import { IImbricateOrigin, IImbricateOriginCollection } from "@imbricate/core";
import { ImbricateSearchPreference, IncludedSearchPreference, readOrCreateSearchPreferenceConfiguration } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLICollectionNotFound } from "../../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type CollectionConfigShowCommandOptions = {

    readonly json?: boolean;
};

export const createCollectionConfigShowCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show config of a collection")
        .option("-j, --json", "print result as JSON")
        .argument("<collection>", "collection name")
        .action(createActionRunner(terminalController, async (
            collectionName: string,
            options: CollectionConfigShowCommandOptions,
        ): Promise<void> => {

            const activeOrigin: string | null = globalManager.activeOrigin;

            if (!activeOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collection: IImbricateOriginCollection | null = await currentOrigin.getCollection(
                collectionName,
            );

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const searchPreference: ImbricateSearchPreference =
                await readOrCreateSearchPreferenceConfiguration(
                    configurationManager.configurationPath,
                );

            const includedInSearch = searchPreference.included.some((item: IncludedSearchPreference) => {
                return item.originName === activeOrigin &&
                    item.collectionName === collection.collectionName;
            });

            if (options.json) {

                terminalController.printJsonInfo({
                    collectionName: collection.collectionName,
                    description: collection.description,
                    includeInSearch: includedInSearch,
                });
                return;
            }

            terminalController.printInfo(`Collection: ${collection.collectionName}`);
            if (collection.description) {
                terminalController.printInfo(`Description: ${collection.description}`);
            }
            terminalController.printInfo(`Include in Search: ${includedInSearch ? "Yes" : "No"}`);
            return;
        }));

    return showCommand;
};
