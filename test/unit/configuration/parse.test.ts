/**
 * @author WMXPY
 * @namespace Configuration
 * @description Parse
 * @override Unit Test
 */

import { IImbricateConfiguration } from "../../../src/cli/configuration/definition";
import { parseRawImbricateConfiguration } from "../../../src/cli/configuration/parse";

describe("Given [Parse] Configuration Helper Methods", (): void => {

    test("Should be able to parse origins from list to list", (): void => {

        const parsed: IImbricateConfiguration = parseRawImbricateConfiguration(
            {
                origins: [{}],
                activeOrigin: "test",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{}],
            activeOrigin: "test",
        });
    });

    test("Should be able to parse origins from string to list", (): void => {

        const parsed: IImbricateConfiguration = parseRawImbricateConfiguration(
            {
                origins: {},
                activeOrigin: "test",
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{}],
            activeOrigin: "test",
        });
    });

    test("Should be able to parse origins from undefined to list", (): void => {

        const parsed: IImbricateConfiguration = parseRawImbricateConfiguration(
            {
                origins: {},
            },
        );

        expect(parsed).toStrictEqual({
            origins: [{}],
            activeOrigin: null,
        });
    });
});
