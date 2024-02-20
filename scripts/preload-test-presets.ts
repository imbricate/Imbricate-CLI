/**
 * @author WMXPY
 * @namespace Script
 * @description Preload Test Presets
 */

import { Folder, attemptMarkDir, digFolder, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";

(async () => {

    const presetsFolderPath = Path.resolve("./test/presets");
    const nodeModulesFolderPath = Path.resolve("./node_modules/@imbricate-test");

    const presetsFolder: Folder = await digFolder(presetsFolderPath);

    for (const file of presetsFolder.files) {

        const packageName: string = file.substring(0, file.length - 3);
        const scriptText = await readTextFile(
            Path.join(presetsFolderPath, file),
        );

        console.log(packageName, scriptText);

        await attemptMarkDir(nodeModulesFolderPath);
        await attemptMarkDir(
            Path.join(nodeModulesFolderPath, packageName),
        );

        await writeTextFile(
            Path.join(nodeModulesFolderPath, packageName, "index.js"),
            scriptText,
        );

        console.log(`Preload preset: ${packageName}`);
    }
})();
