/**
 * @author WMXPY
 * @namespace Sandbox
 * @description Sandbox
 */

import { Sandbox } from "@sudoo/marked";
import { SandboxFeature } from "./feature/feature";
import { sandboxProvideFeatures } from "./provide/feature";

export const createSandbox = (
    features: SandboxFeature[],
): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandboxProvideFeatures(sandbox, features);

    return sandbox;
};
