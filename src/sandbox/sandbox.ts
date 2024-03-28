/**
 * @author WMXPY
 * @namespace Sandbox
 * @description Sandbox
 */

import { MarkedResult, Sandbox } from "@sudoo/marked";
import { SandboxExecuteConfig } from "./definition/config";
import { SandboxEnvironment } from "./definition/environment";
import { SandboxFeature } from "./feature/feature";
import { sandboxProvideFeatures } from "./provide/feature";

export const createSandbox = (
    features: SandboxFeature[],
): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandboxProvideFeatures(sandbox, features);

    return sandbox;
};

export const executeSandboxScript = async (
    script: string,
    features: SandboxFeature[],
    config: SandboxExecuteConfig,
): Promise<MarkedResult> => {

    const sandbox: Sandbox = createSandbox(features);

    sandbox.inject("environment", {
        time: new Date(),
    } satisfies SandboxEnvironment);

    sandbox.inject("config", config);

    return await sandbox.evaluate(script);
};
