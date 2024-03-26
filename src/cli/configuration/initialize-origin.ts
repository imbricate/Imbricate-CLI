/**
 * @author WMXPY
 * @namespace CLI_Configuration
 * @description Initialize Origin
 */

import { FileSystemImbricateOrigin } from "../../origin-implementation/file-system/origin";
import { GlobalManager } from "../../util/global-manager";

export const initializeOrigin = (globalManager: GlobalManager): void => {

    globalManager.putOrigin("current-path", FileSystemImbricateOrigin.withBasePath(process.cwd()));
};
