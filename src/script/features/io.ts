/**
 * @author WMXPY
 * @namespace Script_Features
 * @description IO
 */

import { SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";
import { ITerminalController } from "../../terminal/definition";

export const createIOFeatures = (
    terminalController: ITerminalController,
): SandboxFeature[] => {

    return [
        SandboxFeatureBuilder.providedByInterface()
            .withPackageName("io")
            .withMethodName("print")
            .withImplementation((...content: any[]) => {
                terminalController.printInfo("[SCRIPT]", ...content);
            })
            .build(),
    ];
};
