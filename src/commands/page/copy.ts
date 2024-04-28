/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Copy
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage, ImbricatePageMetadata } from "@imbricate/core";
import { UUIDVersion1 } from "@sudoo/uuid";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIOriginNotFound } from "../../error/origin/origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetPage } from "../../page/get-page";
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
        .description("render a page from a collection")
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
            "->o, --target-origin <origin>",
            "specify the target origin",
        )
        .option(
            "->c, --target-collection <collection>",
            "specify the target collection",
        )
        .option(
            "->d, --target-directories <directories>",
            "specify the target directories, nested with slash (/)",
            inputParseDirectories,
        )
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            options: PageCopyCommandOptions,
        ): Promise<void> => {

            if (typeof options.directories === "undefined" && !options.quiet) {
                terminalController.printInfo("No directories specified, using root directory");
            }
            const directories: string[] = options.directories ?? [];

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
                directories,
                options.title,
                options.identifier,
            );

            const targetOrigin: IImbricateOrigin | null =
                options.targetOrigin
                    ? globalManager.originManager.getOrigin(options.targetOrigin)
                    : currentOrigin;

            if (!targetOrigin) {
                throw CLIOriginNotFound.withOriginName(options.targetOrigin ?? "current");
            }

            const targetCollection: IImbricateOriginCollection | null
                = options.targetCollection
                    ? await targetOrigin.getCollection(options.targetCollection)
                    : await targetOrigin.getCollection(options.collection);

            if (!targetCollection) {
                throw CLICollectionNotFound.withCollectionName(options.targetCollection ?? "unknown");
            }

            const targetDirectories: string[] = options.targetDirectories ?? directories;

            const targetIdentifier: string =
                typeof options.targetOrigin !== "undefined"
                    && options.targetOrigin !== globalManager.activeOrigin
                    ? page.identifier
                    : UUIDVersion1.generateString();

            const newPageMetadata: ImbricatePageMetadata = {

                title: page.title,
                directories: targetDirectories,
                identifier: targetIdentifier,
                createdAt: page.createdAt,
                updatedAt: page.updatedAt,
                digest: page.digest,
                historyRecords: page.historyRecords,
                description: page.description,
            };

            const content: string = await page.readContent();

            await targetCollection.putPage(newPageMetadata, content);
        }));

    return copyCommand;
};
