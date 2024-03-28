/**
 * @author WMXPY
 * @namespace Sandbox
 * @description Sandbox
 */

import { MarkedResult, Sandbox } from "@sudoo/marked";
import { markedDateMixinFactory } from "@sudoo/marked-mixin-date";
import { markedJsonMixinFactory } from "@sudoo/marked-mixin-json";
import { markedMathMixinFactory } from "@sudoo/marked-mixin-math";
import { markedObjectMixinFactory } from "@sudoo/marked-mixin-object";
import { markedParseMixinFactory } from "@sudoo/marked-mixin-parse";
import { SandboxExecuteConfig } from "./definition/config";
import { SandboxEnvironment } from "./definition/environment";
import { SandboxFeature } from "./feature/feature";
import { sandboxProvideFeatures } from "./provide/feature";

export const createSandbox = (
    features: SandboxFeature[],
): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    sandbox.use(markedDateMixinFactory.createInjectMixin("Date"));
    sandbox.use(markedJsonMixinFactory.createInjectMixin("Json"));
    sandbox.use(markedMathMixinFactory.createInjectMixin("Math"));
    sandbox.use(markedObjectMixinFactory.createInjectMixin("Object"));
    sandbox.use(markedParseMixinFactory.createInjectMixin("Parse"));

    sandboxProvideFeatures(sandbox, features);

    return sandbox;
};

export const executeSandboxScript = async (
    script: string,
    features: SandboxFeature[],
    environment: SandboxEnvironment,
    config: SandboxExecuteConfig,
): Promise<MarkedResult> => {

    const sandbox: Sandbox = createSandbox(features);

    sandbox.inject("environment", environment);
    sandbox.inject("config", config);

    return await sandbox.evaluate(script);
};
