/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Catenate
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetPage } from "../../page/get-page";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { inputParseDirectories, inputParsePositiveInteger } from "../../util/input-parse";

type PageCatenateCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly title?: string;
    readonly identifier?: string;

    readonly lines?: number;
    readonly start?: number;
};

export const createPageCatenateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const catenateCommand: Command = createConfiguredCommand("catenate");
    catenateCommand.alias("cat");

    catenateCommand
        .description("catenate a page from a collection")
        .requiredOption(
            "-c, --collection <collection>",
            "specify the collection of the page (required)",
        )
        .option(
            "-d, --directories <directories>",
            "page directories, nested with slash (/)",
            inputParseDirectories,
        )
        .option(
            "-t, --title <page-title>",
            "catenate page by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "catenate page by page identifier or pointer (one-of)",
        )
        .option(
            "-l, --lines <lines>",
            "catenate only limited lines",
            inputParsePositiveInteger,
        )
        .option(
            "-s, --start <start>",
            "catenate from specific line",
            inputParsePositiveInteger,
        )
        .action(createActionRunner(terminalController, async (
            options: PageCatenateCommandOptions,
        ): Promise<void> => {

            if (typeof options.directories === "undefined") {
                terminalController.printInfo("No directories specified, using root directory");
            }
            const directories: string[] = options.directories ?? [];

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collection: IImbricateCollection | null
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

            const content: string = await page.readContent();

            let lines: string[] = content.split("\n");

            if (typeof options.start === "number") {
                lines = lines.slice(options.start);
            }

            if (typeof options.lines === "number") {
                lines = lines.slice(0, options.lines);
            }

            if (lines.length === 0) {
                return;
            }

            terminalController.printInfo(
                lines.join("\n"),
            );
        }));

    return catenateCommand;
};
