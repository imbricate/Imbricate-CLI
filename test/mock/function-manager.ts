/**
 * @author WMXPY
 * @namespace CLI
 * @description Function Manager
 * @override Mock 
 */

import { IImbricateFunctionManager, IImbricateOrigin, ImbricateFunction } from "@imbricate/core";

export class MockFunctionManager implements IImbricateFunctionManager {

    public findSynchronousOriginFunctions(): ImbricateFunction<IImbricateOrigin>[] {

        return [];
    }

    public async findAllOriginFunctions(): Promise<ImbricateFunction<IImbricateOrigin>[]> {

        return [];
    }
}
