/**
 * @author WMXPY
 * @namespace Origin
 * @description Interface
 */

import { PromiseOr } from "../util/definition";
import { ImbricateOriginCollectionDigest } from "./collection/definition";

export interface IImbricateOrigin {

    createCollection(): PromiseOr<void>;
    listCollections(): PromiseOr<ImbricateOriginCollectionDigest[]>;
    removeCollection(): PromiseOr<void>;
}
