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

                editCommand: "edit",
                editHandsFreeCommand: "edit-hands-free",
                diffCommand: "diff",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: "test",
            editCommand: "edit",
            editHandsFreeCommand: "edit-hands-free",
            diffCommand: "diff",
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

                editCommand: "edit",
                editHandsFreeCommand: "edit-hands-free",
                diffCommand: "diff",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: "test",
            editCommand: "edit",
            editHandsFreeCommand: "edit-hands-free",
            diffCommand: "diff",
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

                editCommand: "edit",
                editHandsFreeCommand: "edit-hands-free",
                diffCommand: "diff",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: null,
            editCommand: "edit",
            editHandsFreeCommand: "edit-hands-free",
            diffCommand: "diff",
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

                editCommand: undefined as any,
                editHandsFreeCommand: undefined as any,
                diffCommand: undefined as any,
            },
        );

        const echoPreset = configurationEditorEchoPreset;

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: null,
            editCommand: echoPreset.editCommand,
            editHandsFreeCommand: echoPreset.editHandsFreeCommand,
            diffCommand: echoPreset.diffCommand,
        });
    });
});
