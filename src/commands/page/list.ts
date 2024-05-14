/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description List
 */

import { IImbricateCollection, IImbricateOrigin, ImbricatePageSnapshot, mapLeastCommonIdentifier } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { formatJSON } from "../../util/format-json";
import { inputParseDirectories } from "../../util/input-parse";

type PageListCommandOptions = {

    readonly collection: string;

    readonly directories?: string[];

    readonly json?: boolean;
    readonly recursive?: boolean;
    readonly fullIdentifier?: boolean;
    readonly pointer?: boolean;
};

const generateRawPrint = (
    pages: ImbricatePageSnapshot[],
    directories: string[],
    pointer: boolean,
    fullIdentifier: boolean,
    recursive: boolean,
): string => {

    if (!pointer) {
        return pages
            .map((page) => {
                return page.title;
            })
            .join("\n");
    }

    const mappedLeastCommonIdentifier: Record<string, string> =
        mapLeastCommonIdentifier(pages.map((item) => {

            let title: string = item.title;

            if (recursive) {
                title = [...item.directories, title].join("/");
            }

            return {
                key: title,
                identifier: item.identifier,
            };
        }));

    return pages
        .map((page: ImbricatePageSnapshot) => {

            let title: string = page.title;

            if (recursive) {
                title = [...page.directories, title].join("/");
            }

            const pointer: string = mappedLeastCommonIdentifier[title];
            let output: string = `[${pointer}]`;

            if (fullIdentifier) {
                output += page.identifier.substring(pointer.length);
            }

            return `${output} -> ${title}`;
        })
        .concat(...directories.map((directory) => {
            return `${directory}/`;
        }))
        .join("\n");
};

const generateJSONPrint = (
    pages: ImbricatePageSnapshot[],
    directories: string[],
    pointer: boolean,
): string => {

    if (!pointer) {
        return formatJSON(pages.map((page) => {
            return {
                title: page.title,
                identifier: page.identifier,
            };
        }));
    }

    const mappedLeastCommonIdentifier: Record<string, string> =
        mapLeastCommonIdentifier(pages.map((item) => {
            return {
                key: item.title,
                identifier: item.identifier,
            };
        }));

    return formatJSON({
        pages: pages.map((page) => {
            return {
                title: page.title,
                directories: page.directories,
                pointer: mappedLeastCommonIdentifier[page.title],
                identifier: page.identifier,
            };
        }),
        directories,
    });
};

export const createPageListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");
    listCommand.alias("ls");

    listCommand
        .description("list available pages")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option(
            "-d, --directories <directories>",
            "page directories, nested with slash (/)",
            inputParseDirectories,
        )
        .option("-j, --json", "print result as JSON")
        .option("-r, --recursive", "find pages recursively in directories")
        .option("-f, --full-identifier", "print full identifier")
        .option("--no-pointer", "not to map pointer")
        .action(createActionRunner(terminalController, async (
            options: PageListCommandOptions,
        ): Promise<void> => {

            const directories: string[] = options.directories ?? [];
            const collectionName: string = options.collection;

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collection: IImbricateCollection | null
                = await currentOrigin.findCollection(collectionName);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const pages: ImbricatePageSnapshot[] =
                await collection.listPages(directories, !!options.recursive);

            const listedDirectories: string[] =
                await collection.listDirectories(directories);

            if (options.json) {

                terminalController.printInfo(
                    generateJSONPrint(pages, listedDirectories, !!options.pointer),
                );
                return;
            }

            if (pages.length === 0 && listedDirectories.length === 0) {
                terminalController.printInfo("No pages or directories found");
                return;
            }

            terminalController.printInfo(generateRawPrint(
                pages,
                listedDirectories,
                !!options.pointer,
                !!options.fullIdentifier,
                !!options.recursive,
            ));
        }));

    return listCommand;
};
