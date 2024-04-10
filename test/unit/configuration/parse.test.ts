/**
 * @author WMXPY
 * @namespace Configuration
 * @description Parse
 * @override Unit Test
 */

import { IImbricateConfiguration } from "../../../src/configuration/definition";
import { configurationEditorEchoPreset } from "../../../src/configuration/editor/presets";
import { parseRawImbricateConfiguration } from "../../../src/configuration/parse";

describe("Given [Parse] Configuration Helper Methods", (): void => {

    test("Should be able to parse origins from list to list", (): void => {

        const parsed: IImbricateConfiguration = parseRawImbricateConfiguration(
            {
                origins: [{
                    originName: "test",
                    type: "test",
                    payloads: {},
                }],
                activeOrigin: "test",

                profiles: {
                    "a": {
                        ...configurationEditorEchoPreset,
                    },
                },
                defaultProfile: "a",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: "test",

            profiles: {
                "a": {
                    ...configurationEditorEchoPreset,
                },
            },
            defaultProfile: "a",
        });
    });

    test("Should be able to parse origins from string to list", (): void => {

        const parsed: IImbricateConfiguration = parseRawImbricateConfiguration(
            {
                origins: {
                    originName: "test",
                    type: "test",
                    payloads: {},
                },
                activeOrigin: "test",

                profiles: {
                    "a": {
                        ...configurationEditorEchoPreset,
                    },
                },
                defaultProfile: "a",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: "test",

            profiles: {
                "a": {
                    ...configurationEditorEchoPreset,
                },
            },
            defaultProfile: "a",
        });
    });

    test("Should be able to parse origins from undefined to list", (): void => {

        const parsed: IImbricateConfiguration = parseRawImbricateConfiguration(
            {
                origins: {
                    originName: "test",
                    type: "test",
                    payloads: {},
                },
                activeOrigin: null,

                profiles: {
                    "a": {
                        ...configurationEditorEchoPreset,
                    },
                },
                defaultProfile: "a",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: null,

            profiles: {
                "a": {
                    ...configurationEditorEchoPreset,
                },
            },
            defaultProfile: "a",
        });
    });

    test("Should be able to parse undefined editors", (): void => {

        const parsed: IImbricateConfiguration = parseRawImbricateConfiguration(
            {
                origins: {
                    originName: "test",
                    type: "test",
                    payloads: {},
                },
                activeOrigin: null,

                profiles: undefined,
                defaultProfile: undefined,
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: null,

            profiles: {
                "$default-fallback": {
                    ...configurationEditorEchoPreset,
                },
            },
            defaultProfile: "$default-fallback",
        });
    });
});
