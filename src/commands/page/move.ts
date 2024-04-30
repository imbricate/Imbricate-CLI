/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Move
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { cliCopyMovePage } from "../../page/copy-move-page";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { inputParseDirectories } from "../../util/input-parse";

type PageMoveCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly quiet?: boolean;

    readonly title?: string;
    readonly identifier?: string;

    readonly targetOrigin?: string;
    readonly targetCollection?: string;
    readonly targetDirectories?: string[];
};

export const createPageMoveCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const moveCommand: Command = createConfiguredCommand("move");
    moveCommand.alias("mv");

    moveCommand
        .description("move a page from a collection to another origin/collection/directories")
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
            options: PageMoveCommandOptions,
        ): Promise<void> => {

            if (typeof options.targetOrigin !== "string"
                && typeof options.targetCollection !== "string"
                && typeof options.targetDirectories === "undefined") {

                if (!options.quiet) {
                    terminalController.printInfo("No target specified, not moving the page");
                }

                return;
            }

            return await cliCopyMovePage(
                {
                    deleteOriginal: true,
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

    return moveCommand;
};
