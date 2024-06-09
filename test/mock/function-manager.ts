/**
 * @author WMXPY
 * @namespace CLI
 * @description Function Manager
 * @override Mock 
 */

import { IImbricateFunctionManager, IImbricateOrigin, ImbricateFunction, ImbricateFunctionCapability, ImbricateFunctionManagerBase } from "@imbricate/core";

export class MockFunctionManager implements IImbricateFunctionManager {

    public get capabilities(): ImbricateFunctionCapability {

        return ImbricateFunctionManagerBase.allAllowCapability();
    }

    public findSynchronousOriginFunctions(): ImbricateFunction<IImbricateOrigin>[] {

        return [];
    }

    public async findAllOriginFunctions(): Promise<ImbricateFunction<IImbricateOrigin>[]> {

        return [];
    }
}
