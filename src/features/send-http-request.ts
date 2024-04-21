/**
 * @author WMXPY
 * @namespace Features
 * @description Send Http Request
 */

import { SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";
import axios from "axios";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";

type SendHttpRequestInput = {

    readonly method: string;
    readonly url: string;
    readonly headers?: Record<string, string>;
    readonly body?: any;
};

type SendHttpRequestOutput = {

    readonly response: any;
};

const createImplementation = (
    _globalManager: GlobalManager,
    _terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
) => {

    return async (
        input: SendHttpRequestInput,
    ): Promise<SendHttpRequestOutput> => {

        const result = await axios({
            method: input.method,
            url: input.url,
            headers: input.headers,
            data: input.body,
        });

        return {
            response: result.data,
        };
    };
};

export const createSendHttpRequestFeature = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): SandboxFeature => {

    return SandboxFeatureBuilder.providedByInterface()
        .withPackageName("http")
        .withMethodName("sendHttpRequest")
        .withImplementation(createImplementation(
            globalManager,
            terminalController,
            configurationManager,
        ))
        .build();
};
