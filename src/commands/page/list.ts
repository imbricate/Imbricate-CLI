/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description List
 */

import { IImbricateOrigin, IImbricateOriginCollection, ImbricateOriginCollectionListPagesResponse, mapLeastCommonIdentifier } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLICollectionNotFound } from "../../error/collection/collection-not-found";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type PageListCommandOptions = {

    readonly collection: string;
    readonly json?: boolean;
    readonly pointer?: boolean;
};

const generateRawPrint = (
    pages: ImbricateOriginCollectionListPagesResponse[],
    pointer: boolean,
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
            return {
                key: item.title,
                identifier: item.identifier,
            };
        }));

    return pages
        .map((page: ImbricateOriginCollectionListPagesResponse) => page.title)
        .map((title: string) => {
            return `[${mappedLeastCommonIdentifier[title]}] -> ${title}`;
        })
        .join("\n");
};

const generateJSONPrint = (
    pages: ImbricateOriginCollectionListPagesResponse[],
    pointer: boolean,
): string => {

    if (!pointer) {
        return JSON.stringify(pages.map((page) => {
            return {
                title: page.title,
                identifier: page.identifier,
            };
        }), null, 2);
    }

    const mappedLeastCommonIdentifier: Record<string, string> =
        mapLeastCommonIdentifier(pages.map((item) => {
            return {
                key: item.title,
                identifier: item.identifier,
            };
        }));

    return JSON.stringify(pages.map((page) => {
        return {
            title: page.title,
            pointer: mappedLeastCommonIdentifier[page.title],
            identifier: page.identifier,
        };
    }), null, 2);
};

export const createPageListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");

    listCommand
        .description("list available pages")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option("-j, --json", "print result as JSON")
        .option("-np, --no-pointer", "not to map pointer")
        .action(createActionRunner(terminalController, async (
            options: PageListCommandOptions,
        ): Promise<void> => {

            const collectionName: string = options.collection;

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const hasCollection: boolean = await currentOrigin.hasCollection(collectionName);

            if (!hasCollection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const collection: IImbricateOriginCollection | null
                = await currentOrigin.getCollection(collectionName);

            if (!collection) {
                throw CLICollectionNotFound.withCollectionName(collectionName);
            }

            const pages: ImbricateOriginCollectionListPagesResponse[] =
                await collection.listPages();

            if (options.json) {

                terminalController.printInfo(generateJSONPrint(pages, !!options.pointer));
                return;
            }

            if (pages.length === 0) {
                terminalController.printInfo("No pages found");
                return;
            }

            terminalController.printInfo(generateRawPrint(pages, !!options.pointer));
        }));

    return listCommand;
};
