/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Retitle
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage } from "@imbricate/core";
import { ActiveEditing, SAVING_TARGET_TYPE, SavingTarget, readActiveEditing } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetPage } from "../../page/get-page";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { inputParseDirectories } from "../../util/input-parse";

type PageRetitleCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly quiet?: boolean;

    readonly title?: string;
    readonly identifier?: string;
};

export const createPageRetitleCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const retitleCommand: Command = createConfiguredCommand("retitle");

    retitleCommand
        .description("retitle an existing page")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option(
            "-d, --directories <directories>",
            "page directories, nested with slash (/)",
            inputParseDirectories,
        )
        .option(
            "-t, --title <page-title>",
            "retitle page by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "retitle page by page identifier or pointer (one-of)",
        )
        .option("-q, --quiet", "quite mode")
        .argument("<new-page-title>", "new title of the page")
        .action(createActionRunner(terminalController, async (
            newPageTitle: string,
            options: PageRetitleCommandOptions,
        ): Promise<void> => {

            if (typeof options.directories === "undefined" && !options.quiet) {
                terminalController.printInfo("No directories specified, using root directory");
            }
            const directories: string[] = options.directories ?? [];

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collection: IImbricateCollection | null
                = await currentOrigin
                    .getCollectionManager()
                    .findCollection(options.collection);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(options.collection);
            }

            const page: IImbricatePage = await cliGetPage(
                currentOrigin,
                options.collection,
                directories,
                options.title,
                options.identifier,
            );

            const activeEditing: ActiveEditing[] = await readActiveEditing();

            for (const editing of activeEditing) {

                const target: SavingTarget<any> = editing.target;

                if (target.type === SAVING_TARGET_TYPE.PAGE
                    && target.payload.identifier === page.identifier) {

                    throw new Error(`Cannot rename page "${page.title}" while editing`);
                }
            }

            if (!options.quiet) {

                terminalController.printInfo(`Found page "${page.title}" with identifier "${page.identifier}"`);
            }

            await collection.retitlePage(page.identifier, newPageTitle);

            if (!options.quiet) {

                terminalController.printInfo(`Renamed page "${page.title}" -> "${newPageTitle}"`);
            }
        }));

    return retitleCommand;
};
