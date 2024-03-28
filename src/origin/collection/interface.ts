/**
 * @author WMXPY
 * @namespace Origin_Collection
 * @description Interface
 */

import { IMBRICATE_SEARCH_SNIPPET_TYPE, ImbricateSearchSnippet } from "../../search/snippet";

export type ImbricateOriginCollectionListPagesResponse = {

    readonly title: string;
    readonly identifier: string;
};

export interface IImbricateOriginCollection {

    readonly collectionName: string;
    readonly description?: string;

    findScripts(...onActivities: string[]): Promise<void>;

    listPages(): Promise<ImbricateOriginCollectionListPagesResponse[]>;
    createPage(title: string, initialContent?: string): Promise<ImbricateOriginCollectionListPagesResponse>;
    deletePage(identifier: string, title: string): Promise<void>;
    openPage(title: string): Promise<void>;
    hasPage(title: string): Promise<boolean>;
    searchPages(keyword: string): Promise<
        Array<ImbricateSearchSnippet<IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE>>
    >;
}
