/**
 * @author WMXPY
 * @namespace Commands
 * @description Search
 */

import { IImbricateOrigin, IImbricateOriginCollection, IMBRICATE_SEARCH_RESULT_TYPE, ImbricatePageSearchResult, ImbricateScriptSearchResult, ImbricateSearchResult } from "@imbricate/core";
import { ImbricateSearchPreference, IncludedSearchPreference, readOrCreateSearchPreferenceConfiguration } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { CLIActiveOriginNotFound } from "../error/origin/active-origin-not-found";
import { GlobalManager } from "../global/global-manager";
import { renderSearchResult } from "../search/render";
import { ITerminalController } from "../terminal/definition";
import { createActionRunner } from "../util/action-runner";
import { createConfiguredCommand } from "../util/command";
import { inputParsePositiveInteger } from "../util/input-parse";

type SearchCommandOptions = {

    readonly exact?: boolean;
    readonly limit?: number;

    readonly json?: boolean;
};

export const createSearchCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const searchCommand: Command = createConfiguredCommand("search");

    searchCommand
        .description("search for items in imbricate")
        .option("-e, --exact", "search for exact match")
        .option(
            "-l, --limit <limit>",
            "limit of line for each search target",
            inputParsePositiveInteger,
        )
        .option("-j, --json", "print result as JSON")
        .argument("<prompt>", "prompt to search")
        .action(createActionRunner(terminalController, async (
            prompt: string,
            options: SearchCommandOptions,
        ): Promise<void> => {

            const usingExact: boolean = Boolean(options.exact);

            const activeOrigin: string | null = globalManager.activeOrigin;

            if (!activeOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collections: IImbricateOriginCollection[] = await currentOrigin.listCollections();

            const results: Array<ImbricateSearchResult<IMBRICATE_SEARCH_RESULT_TYPE>> = [];

            const searchPreference: ImbricateSearchPreference =
                await readOrCreateSearchPreferenceConfiguration(
                    configurationManager.configurationPath,
                );

            collections: for (const collection of collections) {

                const includedInSearch = searchPreference.included.some((item: IncludedSearchPreference) => {
                    return item.originName === activeOrigin &&
                        item.collectionName === collection.collectionName;
                });

                if (!includedInSearch) {
                    continue collections;
                }

                const pageResults: ImbricatePageSearchResult[] =
                    await collection.searchPages(prompt, {
                        exact: usingExact,
                        limit: options.limit,
                    });

                results.push(...pageResults);
            }

            const scriptResults: ImbricateScriptSearchResult[] =
                await currentOrigin.searchScripts(prompt, {
                    exact: usingExact,
                    limit: options.limit,
                });

            results.push(...scriptResults);

            if (options.json) {

                terminalController.printJsonInfo(results);
                return;
            }

            if (results.length === 0) {
                terminalController.printInfo("No result found");
                return;
            }

            terminalController.printInfo(results.map((
                result: ImbricateSearchResult<IMBRICATE_SEARCH_RESULT_TYPE>,
            ) => {
                return renderSearchResult(result);
            }).join("\n"));
        }));

    return searchCommand;
};
