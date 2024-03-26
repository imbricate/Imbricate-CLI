/**
 * @author WMXPY
 * @namespace CLI_Extensions
 * @description Initialize Origin
 */

import { Command } from "commander";
import { GlobalManager } from "../global/global-manager";
import { initializeOrigin } from "../configuration/initialize-origin";

export const addInitializeOriginExtension = (
    _program: Command,
    globalManager: GlobalManager,
): void => {

    initializeOrigin(globalManager);
};
