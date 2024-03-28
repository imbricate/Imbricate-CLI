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
    readonly payloads: Record<string, any>;

    createCollection(collectionName: string, description?: string): PromiseOr<void>;
    hasCollection(collectionName: string): PromiseOr<boolean>;
    getCollection(collectionName: string): PromiseOr<IImbricateOriginCollection | null>;
    listCollections(): PromiseOr<IImbricateOriginCollection[]>;
    removeCollection(): PromiseOr<void>;

    createScript(scriptName: string, description?: string): PromiseOr<void>;
    hasScript(scriptName: string): PromiseOr<boolean>;
    getScript(scriptName: string): PromiseOr<string | null>;
    listScripts(): PromiseOr<string[]>;
    removeScript(scriptName: string): PromiseOr<void>;
}
