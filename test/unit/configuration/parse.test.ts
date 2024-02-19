/**
 * @author WMXPY
 * @namespace Configuration
 * @description Parse
 * @override Unit Test
 */

import { ImbricateConfiguration } from "../../../src";
import { parseRawImbricateConfiguration } from "../../../src/configuration/parse";

describe("Given [Parse] Configuration Helper Methods", (): void => {

    test("Should be able to parse presets from list to list", (): void => {

        const parsed: ImbricateConfiguration = parseRawImbricateConfiguration(
            {
                presets: ["test"],
            },
        );

        expect(parsed).toStrictEqual({
            presets: ["test"],
        });
    });

    test("Should be able to parse presets from string to list", (): void => {

        const parsed: ImbricateConfiguration = parseRawImbricateConfiguration(
            {
                presets: "test",
            },
        );

        expect(parsed).toStrictEqual({
            presets: ["test"],
        });
    });
});
