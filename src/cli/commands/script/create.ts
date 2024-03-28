/**
 * @author WMXPY
 * @namespace CLI_Commands_Script
 * @description Create
 */

import { Command } from "commander";
import { IImbricateOriginCollection } from "../../../origin/collection/interface";
import { IImbricateOrigin } from "../../../origin/interface";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { CLIPageAlreadyExists } from "../../error/page/page-already-exists";

type ScriptCreateCommandOptions = {

    readonly collection: string;
    readonly open?: boolean;
    readonly quiet?: boolean;
};

export const createScriptCreateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new standalone script")
        .option("-no, --no-open", "do not open the page after creation")
        .argument("<script-name>", "name of the script")
        .action(createActionRunner(terminalController, async (
            pageTitle: string,
            options: ScriptCreateCommandOptions,
        ): Promise<void> => {

            const collectionName: string = options.collection;

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const hasCollection: boolean = await currentOrigin.hasCollection(collectionName);

            if (!hasCollection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const collection: IImbricateOriginCollection | null
                = await currentOrigin.getCollection(collectionName);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const pageExists: boolean = await collection.hasPage(pageTitle);

            if (pageExists) {
                throw CLIPageAlreadyExists.withPageName(pageTitle);
            }

            const item = await collection.createPage(pageTitle, !!options.open);

            if (!options.quiet) {
                terminalController.printInfo(`Page "${pageTitle}" created`);
                terminalController.printInfo(`Identifier: ${item.identifier}`);
            }
        }));

    return createCommand;
};
