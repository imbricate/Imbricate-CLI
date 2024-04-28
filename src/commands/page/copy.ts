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

const getTargetOrigin = (
    options: PageCopyCommandOptions,
    currentOrigin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
): IImbricateOrigin => {

    if (typeof options.targetOrigin === "string") {

        const targetOrigin: IImbricateOrigin | null =
            globalManager.originManager.getOrigin(options.targetOrigin);

        if (!targetOrigin) {
            throw CLIOriginNotFound.withOriginName(options.targetOrigin);
        }

        if (!options.quiet) {
            terminalController.printInfo(`Target origin: ${options.targetOrigin}`);
        }

        return targetOrigin;
    }

    return currentOrigin;
};

const getTargetCollection = async (
    options: PageCopyCommandOptions,
    currentCollection: IImbricateOriginCollection,
    targetOrigin: IImbricateOrigin,
    terminalController: ITerminalController,
): Promise<IImbricateOriginCollection> => {

    if (typeof options.targetCollection === "string") {

        const targetCollection: IImbricateOriginCollection | null
            = await targetOrigin.getCollection(options.targetCollection);

        if (!targetCollection) {
            throw CLICollectionNotFound.withCollectionName(options.targetCollection);
        }

        if (!options.quiet) {
            terminalController.printInfo(`Target collection: ${options.targetCollection}`);
        }

        return targetCollection;
    }

    const targetCollection: IImbricateOriginCollection | null = await targetOrigin.getCollection(currentCollection.collectionName);

    if (!targetCollection) {

        if (!options.quiet) {
            terminalController.printInfo(`Target collection: ${currentCollection.collectionName} in target origin not found.`);
        }

        throw CLICollectionNotFound.withCollectionName(currentCollection.collectionName);
    }

    return targetCollection;
};

const getTargetDirectories = (
    options: PageCopyCommandOptions,
    currentDirectories: string[],
): string[] => {

    if (typeof options.targetDirectories !== "undefined") {
        return options.targetDirectories;
    }

    return currentDirectories;
};

const getTargetIdentifier = async (
    options: PageCopyCommandOptions,
    targetCollection: IImbricateOriginCollection,
    page: IImbricatePage,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
): Promise<string> => {

    if (typeof options.targetOrigin !== "undefined"
        && options.targetOrigin !== globalManager.activeOrigin) {

        const targetPage: IImbricatePage | null = await targetCollection.getPage(page.identifier);

        if (targetPage) {

            if (!options.quiet) {
                terminalController.printInfo(`Target origin is specified, but page identifier: ${page.identifier}, already exist in target collection.`);
            }

            return UUIDVersion1.generateString();
        }

        if (!options.quiet) {
            terminalController.printInfo(`Target origin is specified, reusing same page identifier: ${page.identifier}`);
        }

        return page.identifier;
    }

    if (!options.quiet) {
        terminalController.printInfo("Copying page under same origin, generating new page identifier");
    }

    return UUIDVersion1.generateString();
};

const getTargetTitle = async (
    options: PageCopyCommandOptions,
    targetDirectories: string[],
    targetCollection: IImbricateOriginCollection,
    page: IImbricatePage,
    terminalController: ITerminalController,
    currentDeterminedOrder: number = 0,
): Promise<string> => {

    let currentDeterminingTitle: string = page.title;

    if (currentDeterminedOrder === 1) {
        currentDeterminingTitle = `${currentDeterminingTitle} - Copy`;
    } else if (currentDeterminedOrder > 1) {
        currentDeterminingTitle = `${currentDeterminingTitle} - Copy (${currentDeterminedOrder})`;
    }

    const hasPage: boolean = await targetCollection.hasPage(targetDirectories, currentDeterminingTitle);

    if (hasPage) {

        return getTargetTitle(
            options,
            targetDirectories,
            targetCollection,
            page,
            terminalController,
            currentDeterminedOrder + 1,
        );
    }

    if (!options.quiet && currentDeterminedOrder > 0) {
        terminalController.printInfo(`Target title already exist, using: ${currentDeterminingTitle}`);
    }

    return currentDeterminingTitle;
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

            const targetOrigin: IImbricateOrigin = getTargetOrigin(
                options,
                currentOrigin,
                globalManager,
                terminalController,
            );

            const targetCollection: IImbricateOriginCollection = await getTargetCollection(
                options,
                collection,
                targetOrigin,
                terminalController,
            );

            const targetDirectories: string[] = getTargetDirectories(
                options,
                directories,
            );

            const targetIdentifier: string = await getTargetIdentifier(
                options,
                targetCollection,
                page,
                globalManager,
                terminalController,
            );

            const targetTitle: string = await getTargetTitle(
                options,
                targetDirectories,
                targetCollection,
                page,
                terminalController,
            );

            const newPageMetadata: ImbricatePageMetadata = {

                title: targetTitle,
                directories: targetDirectories,
                identifier: targetIdentifier,
                createdAt: page.createdAt,
                updatedAt: page.updatedAt,
                digest: page.digest,
                historyRecords: page.historyRecords,
                description: page.description,
            };

            const content: string = await page.readContent();

            console.log(newPageMetadata);

            await targetCollection.putPage(newPageMetadata, content);
        }));

    return copyCommand;
};
