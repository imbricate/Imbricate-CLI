/**
 * @author WMXPY
 * @namespace Mongo
 * @description Origin
 */

import { ImbricateScriptMetadata } from "../../definition/script";
import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin, ImbricateOriginMetadata } from "../../origin/interface";

export class MongoImbricateOrigin implements IImbricateOrigin {

    public readonly metadata: ImbricateOriginMetadata = {
        type: "mongo",
    };
    public readonly payloads: Record<string, any> = {};

    public async createCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async hasCollection(_collectionName: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async getCollection(_collectionName: string): Promise<IImbricateOriginCollection | null> {

        throw new Error("Method not implemented.");
    }

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

        throw new Error("Method not implemented.");
    }

    public async removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async createScript(
        _scriptName: string,
        _description?: string,
    ): Promise<ImbricateScriptMetadata> {

        throw new Error("Method not implemented.");
    }

    public async hasScript(
        _scriptName: string,
    ): Promise<boolean> {

        throw new Error("Method not implemented.");
    }

    public async getScript(
        _scriptName: string,
    ): Promise<string | null> {

        throw new Error("Method not implemented.");
    }

    public async listScripts(): Promise<ImbricateScriptMetadata[]> {

        throw new Error("Method not implemented.");
    }

    public async removeScript(
        _scriptName: string,
    ): Promise<void> {

        throw new Error("Method not implemented.");
    }
}
