/**
 * @author WMXPY
 * @namespace Script_Features
 * @description IO
 */

import { IImbricateOrigin, SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";

export const createIOFeatures = (
    _origin: IImbricateOrigin,
): SandboxFeature[] => {

    return [
        SandboxFeatureBuilder.fromScratch()
            .withPackageName("io")
            .withMethodName("print")
            .withImplementation((...content: any[]) => {
                console.log("[SCRIPT]", ...content);
            })
            .build(),
    ];
};
