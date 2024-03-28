/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Search
 */

import { Command } from "commander";
import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin } from "../../origin/interface";
import { IMBRICATE_SEARCH_SNIPPET_TYPE, ImbricateSearchSnippet } from "../../search/snippet";
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

            const snippets: Array<ImbricateSearchSnippet<IMBRICATE_SEARCH_SNIPPET_TYPE>> = [];

            for (const collection of collections) {

                const pageSnippets: Array<
                    ImbricateSearchSnippet<IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE>
                > = await collection.searchPages(prompt);

                snippets.push(...pageSnippets);
            }

            if (options.json) {

                terminalController.printInfo(JSON.stringify(snippets.map((snippet) => {

                    return {
                        type: snippet.type,
                        scope: snippet.scope,
                        identifier: snippet.identifier,
                        headline: snippet.headline,
                        source: snippet.source,
                        snippet: snippet.snippet,
                    };
                }), null, 2));
                return;
            }

            terminalController.printInfo(snippets.map((snippet) => {
                return [
                    `${snippet.type} - ${snippet.scope}:${snippet.identifier}`,
                    `* | ${snippet.headline}`,
                    `  | ${snippet.snippet}`,
                ].join("\n");
            }).join("\n"));
        }));

    return searchCommand;
};
