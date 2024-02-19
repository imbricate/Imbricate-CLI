/**
 * @author WMXPY
 * @namespace Script
 * @description Replace Version
 */

import * as Fs from "fs";

const packagePath: string = "./package.json";
const scriptPath: string = "./app/cli.js";

const packageFile: string = Fs
    .readFileSync(packagePath)
    .toString();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const packageObject: any = JSON.parse(packageFile);

const version: string = packageObject.version;

const scriptFile: string = Fs
    .readFileSync(scriptPath)
    .toString();

const replacedScript: string = scriptFile.replace("<current-version>", version);

console.log(`Replace version to: ${version}`);

Fs.writeFileSync(scriptPath, replacedScript);
