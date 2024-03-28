/**
 * @author WMXPY
 * @namespace Sandbox_Feature
 * @description Feature
 */

import { SandboxImplementation } from "../definition/implementation";

export class SandboxFeature {

    public static create(
        packageName: string,
        methodName: string,
        implementation: SandboxImplementation,
    ): SandboxFeature {

        return new SandboxFeature(
            packageName,
            methodName,
            implementation,
        );
    }

    private readonly _packageName: string;
    private readonly _methodName: string;
    private readonly _implementation: SandboxImplementation;

    private constructor(
        packageName: string,
        methodName: string,
        implementation: SandboxImplementation,
    ) {

        this._packageName = packageName;
        this._methodName = methodName;
        this._implementation = implementation;
    }

    public get packageName(): string {
        return this._packageName;
    }
    public get methodName(): string {
        return this._methodName;
    }
    public get implementation(): SandboxImplementation {
        return this._implementation;
    }
}
