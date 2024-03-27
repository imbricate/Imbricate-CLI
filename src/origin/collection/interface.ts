/**
 * @author WMXPY
 * @namespace Origin_Collection
 * @description Interface
 */

export interface IImbricateOriginCollection {

    readonly collectionName: string;
    readonly description?: string;

    findScripts(...onActivities: string[]): Promise<void>;

    createPage(title: string): Promise<void>;
}
