/**
 * @author WMXPY
 * @namespace Schema_Definition_API
 * @description API
 */

import { ImbricateAPIHttp } from "./http";

export enum IMBRICATE_API_TYPE {

    HTTP = "HTTP",
}

export type ImbricateAPI<T extends IMBRICATE_API_TYPE> = {

    readonly namespace: string;
    readonly name: string;

    readonly type: T;
} & ImbricateAPISwitch<T>;

export type ImbricateAPISwitch<T extends IMBRICATE_API_TYPE> =
    T extends IMBRICATE_API_TYPE.HTTP ? ImbricateAPIHttp
    : never;
