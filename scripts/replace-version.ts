/**
 * @author WMXPY
 * @namespace Script
 * @description Replace Version
 */

import { readTextFile, writeTextFile } from "@sudoo/io";

(async () => {

    const packagePath: string = "./package.json";
    const scriptPath: string = "./app/cli.js";

    const packageFile: string = await readTextFile(packagePath);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const packageObject: any = JSON.parse(packageFile);

    const version: string = packageObject.version;

    const scriptFile: string = await readTextFile(scriptPath);

    const replacedScript: string = scriptFile.replace("<current-version>", version);

    console.log(`[Build] Replace version to: ${version}`);

    await writeTextFile(scriptPath, replacedScript);
})();
