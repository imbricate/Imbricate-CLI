/**
 * @author WMXPY
 * @namespace Sandbox_Definition
 * @description Environment
 */

export type SandboxEnvironmentOrigin = {

    readonly type: string;
};

export type SandboxEnvironment = {

    readonly origin: SandboxEnvironmentOrigin;
};
