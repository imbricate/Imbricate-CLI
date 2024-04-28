/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Render
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage } from "@imbricate/core";
import { renderMarkdownToHtml } from "@imbricate/markdown-render";
import { isFile, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import { Command } from "commander";
import * as Path from "path";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIRenderOutputAlreadyExists } from "../../error/render/output-already-exists";
import { CLIRenderOutputPathNotExist } from "../../error/render/output-path-not-exist";
import { CLIRenderTemplatePathNotAFile } from "../../error/render/template-path-not-a-file";
import { CLIRenderTemplatePathNotExist } from "../../error/render/template-path-not-exist";
import { GlobalManager } from "../../global/global-manager";
import { cliGetPage } from "../../page/get-page";
import { replaceTemplatePlaceholders } from "../../render/replace";
import { ensureRenderTemplateValid } from "../../render/template";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { recursiveCheckDirectory } from "../../util/check-directory";
import { createConfiguredCommand } from "../../util/command";
import { inputParseDirectories } from "../../util/input-parse";
import { resolvePath } from "../../util/resolve-path";

type PageRenderCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly quiet?: boolean;
    readonly force?: boolean;

    readonly title?: string;
    readonly identifier?: string;

    readonly template?: string;

    readonly output?: string;

    readonly mention?: string;
};

const getTemplate = async (templatePath?: string): Promise<string | null> => {

    if (typeof templatePath !== "string") {
        return null;
    }

    const fixedTemplatePath: string = resolvePath(templatePath);
    const templateExist: boolean = await pathExists(fixedTemplatePath);

    if (!templateExist) {
        throw CLIRenderTemplatePathNotExist.withPath(fixedTemplatePath);
    }

    const templateIsFile: boolean = await isFile(fixedTemplatePath);

    if (!templateIsFile) {
        throw CLIRenderTemplatePathNotAFile.withPath(fixedTemplatePath);
    }

    const templateContent: string = await readTextFile(fixedTemplatePath);

    ensureRenderTemplateValid(templateContent, fixedTemplatePath);

    return templateContent;
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
            "-e, --template <template>",
            "render page with template",
        )
        .option(
            "-o, --output <output>",
            "output to file",
        )
        .option(
            "-m, --mention <mention-link>",
            "enable feature for '@person' to mention link, format: http://example.com/{@}",
        )
        .option("-q, --quiet", "quite mode")
        .option("-f, --force", "force mode")
        .action(createActionRunner(terminalController, async (
            options: PageRenderCommandOptions,
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

            const content: string = await page.readContent();

            const parsed: string = await renderMarkdownToHtml(content, {
                mentionLink: options.mention,
            });

            let output: string = parsed;
            const template: string | null = await getTemplate(options.template);

            if (typeof template === "string") {

                const resolvedTemplatePath: string =
                    resolvePath(options.template as string);

                if (!options.quiet) {
                    terminalController.printInfo(`Rendering with template: ${resolvedTemplatePath}`);
                }

                output = replaceTemplatePlaceholders(
                    template,
                    {
                        title: page.title,
                        content: parsed,
                    },
                );
            }

            if (typeof options.output !== "string") {

                terminalController.printInfo(output);
                return;
            }

            const resolvedOutputPath: string = resolvePath(options.output as string);
            const outputDirectory: string = Path.dirname(resolvedOutputPath);

            const folderExist: boolean = await recursiveCheckDirectory(outputDirectory);

            if (!folderExist) {
                throw CLIRenderOutputPathNotExist.withDirectory(outputDirectory);
            }

            const fileExist: boolean = await pathExists(resolvedOutputPath);

            if (!options.force) {

                if (fileExist) {
                    throw CLIRenderOutputAlreadyExists.withPath(resolvedOutputPath);
                }
            }

            await writeTextFile(resolvedOutputPath, output);

            if (!options.quiet) {
                terminalController.printInfo(`Page rendered output to: ${resolvedOutputPath}`);
            }
        }));

    return renderCommand;
};
