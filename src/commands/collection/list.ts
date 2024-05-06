/**
 * @author WMXPY
 * @namespace Commands_Collection
 * @description List
 */

import { IImbricateOrigin, IImbricateOriginCollection } from "@imbricate/core";
import { readOrCreateSearchPreferenceConfiguration } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type CollectionListCommandOptions = {

    readonly uniqueIdentifier?: string;
    readonly json?: boolean;
};

export const createCollectionListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");
    listCommand.alias("ls");

    listCommand
        .description("list collections")
        .option("-u, --unique-identifier", "include unique identifier in the list")
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: CollectionListCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collections: IImbricateOriginCollection[] = await currentOrigin.listCollections();

            const searchPreference = await readOrCreateSearchPreferenceConfiguration(
                configurationManager.configurationPath,
            );

            if (options.json) {

                terminalController.printJsonInfo(
                    collections.map((collection) => {

                        const includedInSearch: boolean = searchPreference.included.some((item) => {
                            return item.collectionUniqueIdentifier === collection.uniqueIdentifier;
                        });

                        return {
                            collectionName: collection.collectionName,
                            includedInSearch,
                            uniqueIdentifier: collection.uniqueIdentifier,
                            description: collection.description,
                        };
                    }),
                );
                return;
            }

            if (collections.length === 0) {
                terminalController.printInfo("No collection found");
                return;
            }

            terminalController.printInfo(collections.map((collection: IImbricateOriginCollection) => {

                const includedInSearch: boolean = searchPreference.included.some((item) => {
                    return item.collectionUniqueIdentifier === collection.uniqueIdentifier;
                });

                const prefix: string = includedInSearch ? "[*]" : "[ ]";

                if (options.uniqueIdentifier) {
                    return `${prefix} ${collection.collectionName} (${collection.uniqueIdentifier})`;
                }
                return `${prefix} ${collection.collectionName}`;
            }).join("\n"));

            return;
        }));

    return listCommand;
};
