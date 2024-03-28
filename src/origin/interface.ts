/**
 * @author WMXPY
 * @namespace Origin
 * @description Interface
 */

import { MarkedResult } from "@sudoo/marked";
import { PromiseOr } from "../definition/promise";
import { ImbricateScriptMetadata } from "../definition/script";
import { SandboxExecuteConfig } from "../sandbox/definition/config";
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
    getScript(scriptIdentifier: string): PromiseOr<string | null>;
    openScript(scriptIdentifier: string): PromiseOr<string>;
    listScripts(): PromiseOr<ImbricateScriptMetadata[]>;
    removeScript(scriptIdentifier: string, scriptName: string): PromiseOr<void>;

    executeScript(scriptIdentifier: string, config: SandboxExecuteConfig): PromiseOr<MarkedResult | null>;
}
