/**
 * @author WMXPY
 * @namespace Search
 * @description Highlight
 */

import { IMBRICATE_SEARCH_RESULT_TYPE, ImbricateSearchSnippet } from "@imbricate/core";
import { checkIsTTY } from "../util/tty";

export const highlightSearchSnippet = (
    snippet: ImbricateSearchSnippet<IMBRICATE_SEARCH_RESULT_TYPE>,
): string => {

    const isTTY: boolean = checkIsTTY();

    if (!isTTY) {
        return snippet.snippet;
    }

    const highLightIndex: number = snippet.highlight.start;
    const highLightLength: number = snippet.highlight.length;

    const before: string = snippet.snippet.substring(0, highLightIndex);
    const highlight: string = snippet.snippet.substring(highLightIndex, highLightIndex + highLightLength);
    const after: string = snippet.snippet.substring(highLightIndex + highLightLength);

    const highlighted: string = `\u001b[31m${highlight}\u001b[39m`;

    return `${before}${highlighted}${after}`;
};
