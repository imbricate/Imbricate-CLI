/**
 * @author WMXPY
 * @namespace CLI
 * @description Collection
 * @override Mock 
 */

import { IImbricateOriginCollection, IImbricatePage, IMBRICATE_SEARCH_SNIPPET_TYPE, ImbricatePageSnapshot, ImbricateSearchSnippet, PromiseOr } from "@imbricate/core";

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

    public listPages(): Promise<ImbricatePageSnapshot[]> {

        throw new Error("Method not implemented.");
    }

    public createPage(
        _title: string,
    ): Promise<IImbricatePage> {

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

    public getPage(
        _identifier: string,
    ): PromiseOr<IImbricatePage | null> {

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
