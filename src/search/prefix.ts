/**
 * @author WMXPY
 * @namespace Search
 * @description Prefix
 */

import { IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE, IMBRICATE_SEARCH_SNIPPET_TYPE, ImbricateSearchSnippet } from "./snippet";

export const getShortPrefixOfSnippet = (
    snippet: ImbricateSearchSnippet<IMBRICATE_SEARCH_SNIPPET_TYPE>,
): string => {

    switch (snippet.type) {
        case IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE: {

            switch (snippet.source) {

                case IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE.TITLE: {
                    return "T";
                }
                case IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE.CONTENT: {
                    return "C";
                }
            }
        }
    }

    return "?";
};
