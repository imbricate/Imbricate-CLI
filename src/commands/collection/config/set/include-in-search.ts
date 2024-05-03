/**
 * @author WMXPY
 * @namespace Commands_Collection_Config_Set
 * @description Include In Search
 */

import { IImbricateOrigin } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../../../configuration/interface";
import { CLICollectionNotFound } from "../../../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../../../global/global-manager";
import { ITerminalController } from "../../../../terminal/definition";
import { createActionRunner } from "../../../../util/action-runner";
import { createConfiguredCommand } from "../../../../util/command";
import { inputParseBoolean } from "../../../../util/input-parse";

type CollectionConfigSetIncludeInSearchCommandOptions = {

    readonly json?: boolean;
};

export const createCollectionConfigSetIncludeInSearchCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const includeInSearchCommand: Command = createConfiguredCommand("include-in-search");

    includeInSearchCommand
        .description("set include in search of a collection")
        .argument("<collection>", "collection name")
        .argument(
            "<value>",
            "Include in search value",
            inputParseBoolean,
        )
        .action(createActionRunner(terminalController, async (
            collectionName: string,
            value: boolean,
            _options: CollectionConfigSetIncludeInSearchCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collection: boolean = await currentOrigin.hasCollection(
                collectionName,
            );

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            if (value) {

                terminalController.printInfo(`Including collection ${collectionName} in search`);
                await currentOrigin.includeCollectionInSearch(collectionName);
            } else {

                terminalController.printInfo(`Excluding collection ${collectionName} in search`);
                await currentOrigin.excludeCollectionInSearch(collectionName);
            }

            return;
        }));

    return includeInSearchCommand;
};
