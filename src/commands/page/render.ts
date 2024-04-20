/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Render
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetPage } from "../../page/get-page";
import { renderMarkdownToHtml } from "../../render/markdown-to-html";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type PageRenderCommandOptions = {

    readonly collection: string;

    readonly title?: string;
    readonly identifier?: string;

    readonly template?: string;
};

export const createPageRenderCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const renderCommand: Command = createConfiguredCommand("render");

    renderCommand
        .description("render a page from a collection")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
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
            "-e, --template <template>",
            "render page with template",
        )
        .action(createActionRunner(terminalController, async (
            options: PageRenderCommandOptions,
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

            const content: string = await page.readContent();

            const parsed: string = await renderMarkdownToHtml(content);

            terminalController.printInfo(parsed);
        }));

    return renderCommand;
};
