/**
 * @author WMXPY
 * @namespace Script
 * @description Preload Test Presets
 */

import { Folder, digFolder } from "@sudoo/io";

(async () => {

    const presetsFolderPath = "./test/presets";

    const presetsFolder: Folder = await digFolder(presetsFolderPath);

    console.log(presetsFolder);
})();
