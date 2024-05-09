/**
 * @author WMXPY
 * @namespace Commands_Page_History
 * @description Show
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage, ImbricatePageHistoryRecord } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLICollectionNotFound } from "../../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { cliGetPage } from "../../../page/get-page";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";
import { inputParseDirectories } from "../../../util/input-parse";

type PageHistoryShowCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly title?: string;
    readonly identifier?: string;

    readonly json?: boolean;
};

export const createPageHistoryShowCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const historyCommand: Command = createConfiguredCommand("show");

    historyCommand
        .description("show history of a page")
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
            "set attribute by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "set attribute by page identifier or pointer (one-of)",
        )
        .option("-j, --json", "print result as JSON")
        .action(createActionRunner(terminalController, async (
            options: PageHistoryShowCommandOptions,
        ): Promise<void> => {

            if (typeof options.directories === "undefined") {
                terminalController.printInfo("No directories specified, using root directory");
            }
            const directories: string[] = options.directories ?? [];

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collection: IImbricateOriginCollection | null
                = await currentOrigin.findCollection(options.collection);

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

            if (options.json) {

                terminalController.printJsonInfo(
                    page.historyRecords,
                );
                return;
            }

            terminalController.printInfo("| Latest Version");
            terminalController.printInfo(`| ${page.updatedAt.toLocaleString()}`);
            terminalController.printInfo(`|- ${page.digest}`);
            terminalController.printInfo("|");

            terminalController.printInfo(page.historyRecords.flatMap(
                (record: ImbricatePageHistoryRecord) => {
                    return [
                        `| ${record.updatedAt.toLocaleString()}`,
                        `|- ${record.digest}`,
                    ];
                },
            ).join("\n"));
        }));

    return historyCommand;
};
