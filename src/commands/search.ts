/**
 * @author WMXPY
 * @namespace Commands
 * @description Search
 */

import { IImbricateOrigin, IImbricateOriginCollection, IMBRICATE_SEARCH_RESULT_TYPE, ImbricatePageSearchResult, ImbricateScriptSearchResult, ImbricateSearchResult } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { CLIActiveOriginNotFound } from "../error/origin/active-origin-not-found";
import { CLISearchInvalidLimit } from "../error/search/invalid-limit";
import { GlobalManager } from "../global/global-manager";
import { renderSearchResult } from "../search/render";
import { ITerminalController } from "../terminal/definition";
import { createActionRunner } from "../util/action-runner";
import { createConfiguredCommand } from "../util/command";

type SearchCommandOptions = {

    readonly exact?: boolean;
    readonly limit?: string;

    readonly json?: boolean;
};

const fixSearchLimit = (limit?: string): number | undefined => {

    if (!limit) {
        return undefined;
    }

    const parsed: number = Number(limit);
    if (isNaN(parsed)) {
        throw CLISearchInvalidLimit.notANumber(limit);
    }

    if (!Number.isInteger(parsed)) {
        throw CLISearchInvalidLimit.notAInteger(parsed);
    }

    if (parsed <= 0) {
        throw CLISearchInvalidLimit.notPositive(parsed);
    }

    return parsed;
};

export const createSearchCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const searchCommand: Command = createConfiguredCommand("search");

    searchCommand
        .description("search for items in imbricate")
        .option("-e, --exact", "search for exact match")
        .option("-l, --limit <limit>", "limit of line for each search target")
        .option("-j, --json", "print result as JSON")
        .argument("<prompt>", "prompt to search")
        .action(createActionRunner(terminalController, async (
            prompt: string,
            options: SearchCommandOptions,
        ): Promise<void> => {

            const usingExact: boolean = Boolean(options.exact);

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const collections: IImbricateOriginCollection[] = await currentOrigin.listCollections();

            const results: Array<ImbricateSearchResult<IMBRICATE_SEARCH_RESULT_TYPE>> = [];

            const searchLimit: number | undefined = fixSearchLimit(options.limit);

            for (const collection of collections) {

                const pageResults: ImbricatePageSearchResult[] =
                    await collection.searchPages(prompt, {
                        exact: usingExact,
                        limit: searchLimit,
                    });

                results.push(...pageResults);
            }

            const scriptResults: ImbricateScriptSearchResult[] =
                await currentOrigin.searchScripts(prompt, {
                    exact: usingExact,
                    limit: searchLimit,
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
