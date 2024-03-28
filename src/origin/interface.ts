/**
 * @author WMXPY
 * @namespace Origin
 * @description Interface
 */

import { PromiseOr } from "../definition/promise";
import { ImbricateScriptMetadata } from "../definition/script";
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

    createScript(scriptName: string, description?: string): PromiseOr<ImbricateScriptMetadata>;
    hasScript(scriptName: string): PromiseOr<boolean>;
    getScript(scriptName: string): PromiseOr<string | null>;
    openScript(scriptName: string): PromiseOr<void>;
    listScripts(): PromiseOr<ImbricateScriptMetadata[]>;
    removeScript(scriptIdentifier: string): PromiseOr<void>;
}
