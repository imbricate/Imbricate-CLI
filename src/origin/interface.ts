/**
 * @author WMXPY
 * @namespace Origin
 * @description Interface
 */

import { PromiseOr } from "../util/definition";
import { ImbricateOriginDatabaseDigest } from "./database/definition";

export interface IImbricateOrigin {

    createDatabase(): PromiseOr<void>;
    listDatabase(): PromiseOr<ImbricateOriginDatabaseDigest[]>;
    removeDatabase(): PromiseOr<void>;
}
