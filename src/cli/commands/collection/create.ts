/**
 * @author WMXPY
 * @namespace CLI_Commands_Collection
 * @description Create
 */

import { Command } from "commander";
import { IImbricateOrigin } from "../../../origin/interface";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionAlreadyExists } from "../../error/collection/collection-already-exists";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type CollectionCreateCommandOptions = {

    readonly description?: string;
    readonly quiet?: boolean;
};

export const createCollectionCreateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new collection")
        .option("-d, --description <description>", "description of the collection")
        .option("-q, --quiet", "quite mode")
        .argument("<collection-name>", "Name of the collection")
        .action(createActionRunner(terminalController, async (
            collectionName: string,
            options: CollectionCreateCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const hasCollection: boolean = await currentOrigin.hasCollection(collectionName);

            if (hasCollection) {
                throw CLICollectionAlreadyExists.withCollectionName(collectionName);
            }

            await currentOrigin.createCollection(collectionName, options.description);

            if (!options.quiet) {
                terminalController.printInfo(`Collection ${collectionName} created`);
            }
        }));

    return createCommand;
};
