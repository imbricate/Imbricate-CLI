/**
 * @author WMXPY
 * @namespace Search
 * @description Render
 */

import { IMBRICATE_SEARCH_RESULT_TYPE, ImbricatePageSearchResult, ImbricatePageSearchSnippet, ImbricateScriptSearchResult, ImbricateScriptSearchSnippet, ImbricateSearchResult, getShortPrefixOfSnippet } from "@imbricate/core";
import { CLIInvalidSearchResult } from "../error/search/invalid-search-result";

export const renderSearchResult = (
    result: ImbricateSearchResult<IMBRICATE_SEARCH_RESULT_TYPE>,
): string => {

    switch (result.type) {

        case IMBRICATE_SEARCH_RESULT_TYPE.PAGE: {

            const fixedResult: ImbricatePageSearchResult =
                result as ImbricatePageSearchResult;

            const lines: string[] = [
                `${fixedResult.type} - ${fixedResult.scope}:${fixedResult.identifier}`,
                `* | ${fixedResult.headline}`,
            ];

            const snippets: ImbricatePageSearchSnippet[] = fixedResult.snippets;

            for (const snippet of snippets) {

                const prefix: string = getShortPrefixOfSnippet(
                    IMBRICATE_SEARCH_RESULT_TYPE.PAGE,
                    snippet,
                );

                lines.push(`${prefix} | ${snippet.snippet}`);
            }
            return lines.join("\n");
        }
        case IMBRICATE_SEARCH_RESULT_TYPE.SCRIPT: {

            const fixedResult: ImbricateScriptSearchResult =
                result as ImbricateScriptSearchResult;

            const lines: string[] = [
                `${fixedResult.type} - ${fixedResult.identifier}`,
                `* | ${fixedResult.headline}`,
            ];

            const snippets: ImbricateScriptSearchSnippet[] = fixedResult.snippets;

            for (const snippet of snippets) {

                const prefix: string = getShortPrefixOfSnippet(
                    IMBRICATE_SEARCH_RESULT_TYPE.SCRIPT,
                    snippet,
                );

                lines.push(`${prefix} | ${snippet.snippet}`);
            }
            return lines.join("\n");
        }
    }

    throw CLIInvalidSearchResult.withResult(result);
};
