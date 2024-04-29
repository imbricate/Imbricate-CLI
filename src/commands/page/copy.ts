/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Copy
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { cliCopyMovePage } from "../../page/copy-move-page";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { inputParseDirectories } from "../../util/input-parse";

type PageCopyCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly quiet?: boolean;

    readonly title?: string;
    readonly identifier?: string;

    readonly targetOrigin?: string;
    readonly targetCollection?: string;
    readonly targetDirectories?: string[];
};

export const createPageCopyCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const copyCommand: Command = createConfiguredCommand("copy");
    copyCommand.alias("cp");

    copyCommand
        .description("copy a page from a collection to another origin/collection/directories")
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
            "render page by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "render page by page identifier or pointer (one-of)",
        )
        .option(
            "-@o, --target-origin <origin>",
            "specify the target origin",
        )
        .option(
            "-@c, --target-collection <collection>",
            "specify the target collection",
        )
        .option(
            "-@d, --target-directories <directories>",
            "specify the target directories, nested with slash (/)",
            inputParseDirectories,
        )
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            options: PageCopyCommandOptions,
        ): Promise<void> => {

            return await cliCopyMovePage(
                {
                    deleteOriginal: false,
                    collection: options.collection,
                    directories: options.directories,
                    quiet: options.quiet,
                    title: options.title,
                    identifier: options.identifier,
                    targetOrigin: options.targetOrigin,
                    targetCollection: options.targetCollection,
                    targetDirectories: options.targetDirectories,
                },
                globalManager,
                terminalController,
            );
        }));

    return copyCommand;
};
