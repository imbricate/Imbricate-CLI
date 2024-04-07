/**
 * @author WMXPY
 * @namespace Commands
 * @description Search
 */

import { IImbricateOrigin, IImbricateOriginCollection, IMBRICATE_SEARCH_SNIPPET_TYPE, ImbricatePageSearchResult, ImbricatePageSearchSnippet, ImbricateScriptSearchResult, ImbricateScriptSearchSnippet, ImbricateSearchResult, getShortPrefixOfSnippet } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { CLIActiveOriginNotFound } from "../error/origin/active-origin-not-found";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createActionRunner } from "../util/action-runner";
import { createConfiguredCommand } from "../util/command";

type SearchCommandOptions = {

    readonly json?: boolean;
};

export const createSearchCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const searchCommand: Command = createConfiguredCommand("search");

    searchCommand
        .description("search for items in imbricate")
        .option("-j, --json", "print result as JSON")
        .argument("<prompt>", "prompt to search")
        .action(createActionRunner(terminalController, async (
            prompt: string,
            options: SearchCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collections: IImbricateOriginCollection[] = await currentOrigin.listCollections();

            const results: Array<ImbricateSearchResult<IMBRICATE_SEARCH_SNIPPET_TYPE>> = [];

            for (const collection of collections) {

                const pageResults: ImbricatePageSearchResult[] =
                    await collection.searchPages(prompt);

                results.push(...pageResults);
            }

            const scriptResults: ImbricateScriptSearchResult[] =
                await currentOrigin.searchScripts(prompt);

            results.push(...scriptResults);

            if (options.json) {

                terminalController.printInfo(JSON.stringify(results, null, 2));
                return;
            }

            if (results.length === 0) {
                terminalController.printInfo("No result found");
                return;
            }

            terminalController.printInfo(results.map((result) => {

                switch (result.type) {

                    case IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE: {

                        const fixedResult: ImbricatePageSearchResult =
                            result as ImbricatePageSearchResult;

                        const lines: string[] = [
                            `${fixedResult.type} - ${fixedResult.scope}:${fixedResult.identifier}`,
                            `* | ${fixedResult.headline}`,
                        ];

                        const snippets: ImbricatePageSearchSnippet[] = fixedResult.snippets;

                        for (const snippet of snippets) {

                            const prefix: string = getShortPrefixOfSnippet(
                                IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE,
                                snippet,
                            );

                            lines.push(`${prefix} | ${snippet.snippet}`);
                        }
                        return lines.join("\n");
                    }
                    case IMBRICATE_SEARCH_SNIPPET_TYPE.SCRIPT: {

                        const fixedResult: ImbricateScriptSearchResult =
                            result as ImbricateScriptSearchResult;

                        const lines: string[] = [
                            `${fixedResult.type} - ${fixedResult.identifier}`,
                            `* | ${fixedResult.headline}`,
                        ];

                        const snippets: ImbricateScriptSearchSnippet[] = fixedResult.snippets;

                        for (const snippet of snippets) {

                            const prefix: string = getShortPrefixOfSnippet(
                                IMBRICATE_SEARCH_SNIPPET_TYPE.SCRIPT,
                                snippet,
                            );

                            lines.push(`${prefix} | ${snippet.snippet}`);
                        }
                        return lines.join("\n");
                    }
                }
            }).join("\n"));
        }));

    return searchCommand;
};
