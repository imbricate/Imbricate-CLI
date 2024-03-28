/**
 * @author WMXPY
 * @namespace Origin_Search
 * @description Snippet
 */

export enum IMBRICATE_SEARCH_SNIPPET_TYPE {

    PAGE = "PAGE",
}

export enum IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE {

    TITLE = "TITLE",
    CONTENT = "CONTENT",
}

type IMBRICATE_SEARCH_SNIPPET_SNIPPET_SOURCE<T extends IMBRICATE_SEARCH_SNIPPET_TYPE> =
    T extends IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE ? IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE
    : never;

export type ImbricateSearchSnippet<T extends IMBRICATE_SEARCH_SNIPPET_TYPE> = {

    readonly type: T;

    readonly scope: string;
    readonly identifier: string;

    readonly headline: string;

    readonly source: IMBRICATE_SEARCH_SNIPPET_SNIPPET_SOURCE<T>;
    readonly snippet: string;
};
