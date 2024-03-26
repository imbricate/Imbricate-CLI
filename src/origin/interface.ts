/**
 * @author WMXPY
 * @namespace Origin
 * @description Interface
 */

import { PromiseOr } from "../definition/promise";
import { IImbricateOriginCollection } from "./collection/interface";

export interface IImbricateOrigin {

    readonly originName: string;

    createCollection(): PromiseOr<void>;
    listCollections(): PromiseOr<IImbricateOriginCollection[]>;
    removeCollection(): PromiseOr<void>;
}
