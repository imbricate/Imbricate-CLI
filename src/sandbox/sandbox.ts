/**
 * @author WMXPY
 * @namespace Sandbox
 * @description Sandbox
 */

import { Sandbox } from "@sudoo/marked";

export const createSandbox = (): Sandbox => {

    const sandbox: Sandbox = Sandbox.fromAllEvaluators();

    return sandbox;
};
