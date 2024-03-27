/**
 * @author WMXPY
 * @namespace Origin_Collection
 * @description Interface
 */

export type ImbricateOriginCollectionListPagesResponse = {

    readonly title: string;
    readonly identifier: string;
};

export interface IImbricateOriginCollection {

    readonly collectionName: string;
    readonly description?: string;

    findScripts(...onActivities: string[]): Promise<void>;

    listPages(): Promise<ImbricateOriginCollectionListPagesResponse[]>;
    createPage(title: string, open: boolean): Promise<ImbricateOriginCollectionListPagesResponse>;
    hasPage(title: string): Promise<boolean>;
}
