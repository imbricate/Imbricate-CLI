/**
 * @author WMXPY
 * @namespace OriginImplementation_FileSystem
 * @description Origin
 */

import { PromiseOr } from "../../definition/promise";
import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin } from "../../origin/interface";

export class FileSystemImbricateOrigin implements IImbricateOrigin {

    public createCollection(): PromiseOr<void> {
        throw new Error("Method not implemented.");
    }

    public listCollections(): PromiseOr<IImbricateOriginCollection[]> {
        throw new Error("Method not implemented.");
    }

    public removeCollection(): PromiseOr<void> {
        throw new Error("Method not implemented.");
    }
}
