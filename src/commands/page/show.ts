/**
 * @author WMXPY
 * @namespace Commands_Page
 * @description Show
 */

import { IImbricateOrigin, IImbricatePage } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { cliGetPage } from "../../page/get-page";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type PageShowCommandOptions = {

    readonly collection: string;

    readonly json?: boolean;

    readonly title?: string;
    readonly identifier?: string;
};

export const createPageShowCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show details of a page in a collection")
        .requiredOption(
            "-c, --collection <description>",
            "specify the collection of the page (required)",
        )
        .option("-j, --json", "print result as JSON")
        .option(
            "-t, --title <page-title>",
            "open page by page title (one-of)",
        )
        .option(
            "-i, --identifier <page-identifier>",
            "open page by page identifier or pointer (one-of)",
        )
        .action(createActionRunner(terminalController, async (
            options: PageShowCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const page: IImbricatePage = await cliGetPage(
                currentOrigin,
                options.collection,
                options.title,
                options.identifier,
            );

            if (options.json) {

                terminalController.printInfo(JSON.stringify({
                    title: page.title,
                    identifier: page.identifier,
                    createdAt: page.createdAt.toISOString(),
                    updatedAt: page.updatedAt.toISOString(),
                }, null, 2));
                return;
            }

            const textOutput: string = [
                `Title: ${page.title}`,
                `Identifier: ${page.identifier}`,
                `Created At: ${page.createdAt.toLocaleString()}`,
                `Updated At: ${page.updatedAt.toLocaleString()}`,
            ].join("\n");

            terminalController.printInfo(textOutput);
        }));

    return showCommand;
};
