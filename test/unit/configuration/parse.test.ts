/**
 * @author WMXPY
 * @namespace Configuration
 * @description Parse
 * @override Unit Test
 */

import { IImbricateConfiguration } from "../../../src/configuration/definition";
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
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: "test",
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
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: "test",
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
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{
                originName: "test",
                type: "test",
                payloads: {},
            }],
            activeOrigin: null,
        });
    });
});
