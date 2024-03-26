/**
 * @author WMXPY
 * @namespace Origin
 * @description Interface
 */

import { PromiseOr } from "../definition/promise";
import { IImbricateOriginCollection } from "./collection/interface";

export type ImbricateOriginMetadata = {

    readonly type: string;
};

export interface IImbricateOrigin {

    readonly metadata: ImbricateOriginMetadata;

    createCollection(): PromiseOr<void>;
    listCollections(): PromiseOr<IImbricateOriginCollection[]>;
    removeCollection(): PromiseOr<void>;
}
