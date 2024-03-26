/**
 * @author WMXPY
 * @namespace Mongo
 * @description Origin
 */

import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { IImbricateOrigin } from "../../origin/interface";

export class MongoImbricateOrigin implements IImbricateOrigin {

    public get originName(): string {
        return "Mongo";
    }

    public async createCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }

    public async listCollections(): Promise<IImbricateOriginCollection[]> {

        throw new Error("Method not implemented.");
    }

    public async removeCollection(): Promise<void> {

        throw new Error("Method not implemented.");
    }
}
