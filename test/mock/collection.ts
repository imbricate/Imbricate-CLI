/**
 * @author WMXPY
 * @namespace CLI
 * @description Collection
 * @override Mock 
 */

import { IImbricateOriginCollection, IMBRICATE_SEARCH_SNIPPET_TYPE, ImbricateOriginCollectionListPagesResponse, ImbricateSearchSnippet } from "@imbricate/core";

export class MockCollection implements IImbricateOriginCollection {

    public static create(): MockCollection {

        return new MockCollection();
    }

    public collectionName: string;
    public description?: string | undefined;

    private constructor() {

        this.collectionName = "mock";
        this.description = "mock";
    }

    public findScripts(..._onActivities: string[]): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public listPages(): Promise<ImbricateOriginCollectionListPagesResponse[]> {

        throw new Error("Method not implemented.");
    }

    public createPage(
        _title: string,
    ): Promise<ImbricateOriginCollectionListPagesResponse> {

        throw new Error("Method not implemented.");
    }

    public deletePage(
        _identifier: string,
        _title: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public openPage(
        _title: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public readPage(
        _identifier: string,
    ): Promise<string> {

        throw new Error("Method not implemented.");
    }

    public hasPage(
        _title: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }

    public searchPages(
        _keyword: string,
    ): Promise<Array<ImbricateSearchSnippet<IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE>>> {

        throw new Error("Method not implemented.");
    }
}
