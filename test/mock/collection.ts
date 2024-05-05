/**
 * @author WMXPY
 * @namespace CLI
 * @description Collection
 * @override Mock 
 */

import { IImbricateOriginCollection, IImbricatePage, ImbricateCollectionCapability, ImbricatePageMetadata, ImbricatePageQuery, ImbricatePageQueryConfig, ImbricatePageSearchResult, ImbricatePageSnapshot, ImbricateSearchPageConfig, createAllAllowImbricateCollectionCapability } from "@imbricate/core";

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

    public get capabilities(): ImbricateCollectionCapability {
        return createAllAllowImbricateCollectionCapability();
    }

    public queryPages(
        _query: ImbricatePageQuery,
        _config: ImbricatePageQueryConfig,
    ): Promise<IImbricatePage[]> {

        throw new Error("Method not implemented.");
    }

    public findScripts(..._onActivities: string[]): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public listPages(): Promise<ImbricatePageSnapshot[]> {

        throw new Error("Method not implemented.");
    }

    public listDirectories(
        _directories: string[],
    ): Promise<string[]> {

        throw new Error("Method not implemented.");
    }

    public createPage(
        _directories: string[],
        _title: string,
    ): Promise<IImbricatePage> {

        throw new Error("Method not implemented.");
    }

    public deletePage(
        _identifier: string,
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
    ): Promise<IImbricatePage | null> {

        throw new Error("Method not implemented.");
    }

    public hasPage(
        _directories: string[],
        _title: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }
    public putPage(
        _pageMetadata: ImbricatePageMetadata,
        _content: string,
    ): Promise<IImbricatePage> {

        throw new Error("Method not implemented.");
    }

    public retitlePage(
        _identifier: string,
        _newTitle: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public searchPages(
        _keyword: string,
        _config: ImbricateSearchPageConfig,
    ): Promise<ImbricatePageSearchResult[]> {

        throw new Error("Method not implemented.");
    }
}
