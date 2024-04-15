/**
 * @author WMXPY
 * @namespace Commands_Page_Attribute
 * @description Set
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLICollectionNotFound } from "../../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { cliGetPage } from "../../../page/get-page";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type PageAttributeSetCommandOptions = {

    readonly collection: string;

    readonly title?: string;
    readonly identifier?: string;

    readonly quiet?: boolean;
};

export const createPageAttributeSetCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const setCommand: Command = createConfiguredCommand("set");

    setCommand
        .description("set attribute of a page")
        .argument("<attribute-key>", "the key of the attribute")
        .argument("<attribute-value>", "the value of the attribute")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option(
            "-t, --title <page-title>",
            "set attribute by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "set attribute by page identifier or pointer (one-of)",
        )
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            attributeKey: string,
            attributeValue: string,
            options: PageAttributeSetCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collection: IImbricateOriginCollection | null
                = await currentOrigin.getCollection(options.collection);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(options.collection);
            }

            const page: IImbricatePage = await cliGetPage(
                currentOrigin,
                options.collection,
                options.title,
                options.identifier,
            );

            await page.writeAttribute(attributeKey, attributeValue);

            if (!options.quiet) {
                terminalController.printInfo(`Attribute ${attributeKey} set to ${attributeValue}`);
            }
        }));

    return setCommand;
};
