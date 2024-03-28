/**
 * @author WMXPY
 * @namespace FileSystem_Execute
 * @description Feature
 */

import { SandboxFeatureBuilder } from "../../../sandbox/feature/builder";
import { SandboxFeature } from "../../../sandbox/feature/feature";

export const createFileSystemOriginExecuteFeature = (): SandboxFeature[] => {

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
