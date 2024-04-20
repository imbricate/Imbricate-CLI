/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Render
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage } from "@imbricate/core";
import { isFolder } from "@sudoo/io";
import { Command } from "commander";
import * as Path from "path";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIRenderOutputPathNotExist } from "../../error/render/output-path-not-exist";
import { GlobalManager } from "../../global/global-manager";
import { cliGetPage } from "../../page/get-page";
import { renderMarkdownToHtml } from "../../render/markdown-to-html";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { resolvePath } from "../../util/resolve-path";

type PageRenderCommandOptions = {

    readonly collection: string;

    readonly title?: string;
    readonly identifier?: string;

    readonly template?: string;

    readonly output?: string;
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
        .option(
            "-o, --output <output>",
            "output to file",
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

            if (typeof options.output !== "string") {
                terminalController.printInfo(parsed);
            }

            const resolvedOutputPath: string = resolvePath(options.output as string);
            const outputDirectory: string = Path.dirname(resolvedOutputPath);

            const folderExist: boolean = await isFolder(outputDirectory);

            if (!folderExist) {
                throw CLIRenderOutputPathNotExist.withDirectory(outputDirectory);
            }
        }));

    return renderCommand;
};
