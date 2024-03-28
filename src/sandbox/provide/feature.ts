/**
 * @author WMXPY
 * @namespace Sandbox_Provide
 * @description Feature
 */

import { Sandbox } from "@sudoo/marked";
import { SandboxImplementation } from "../definition/implementation";
import { SandboxFeature } from "../feature/feature";

const mapFeatures = (
    features: SandboxFeature[],
): Record<string, Record<string, SandboxImplementation>> => {

    const map: Record<string, Record<string, SandboxImplementation>> = {};

    for (const feature of features) {

        if (!map[feature.packageName]) {
            map[feature.packageName] = {};
        }

        map[feature.packageName][feature.methodName] = feature.implementation;
    }

    return map;
};

export const sandboxProvideFeatures = (
    sandbox: Sandbox,
    features: SandboxFeature[],
): void => {

    const mappedFeatures: Record<string, Record<string, SandboxImplementation>> = mapFeatures(features);

    for (const packageName of Object.keys(mappedFeatures)) {

        const methods: Record<string, SandboxImplementation> = mappedFeatures[packageName];

        sandbox.provide(packageName, methods);
    }
};
