/**
 * @author WMXPY
 * @namespace FileSystem_Execute
 * @description Feature
 */

import { IImbricateOrigin } from "../../../origin/interface";
import { SandboxFeatureBuilder } from "../../../sandbox/feature/builder";
import { SandboxFeature } from "../../../sandbox/feature/feature";
import { createCreatePageFeature } from "./features/create-page";

export const createFileSystemOriginExecuteFeature = (
    origin: IImbricateOrigin,
): SandboxFeature[] => {

    return [
        SandboxFeatureBuilder.fromScratch()
            .withPackageName("io")
            .withMethodName("print")
            .withImplementation((...content: any[]) => {
                console.log("[SCRIPT]", ...content);
            })
            .build(),
        createCreatePageFeature(origin),
    ];
};
