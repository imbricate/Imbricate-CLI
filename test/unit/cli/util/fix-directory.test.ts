/**
 * @author WMXPY
 * @namespace CLI_Util
 * @description Fix Directory
 * @override Unit Test
 */

import { fixDirectory } from "../../../../src/cli/util/fix-directory";

describe("Given [Fix Directory] Helper Methods", (): void => {

    test("Should be able to resolve direction with undefined", (): void => {

        const result: string = fixDirectory(undefined);

        expect(result).toEqual(process.cwd());
    });

    test("Should be able to resolve direction with empty", (): void => {

        const result: string = fixDirectory("");

        expect(result).toEqual(process.cwd());
    });

    test("Should be able to resolve direction with absolute", (): void => {

        const result: string = fixDirectory("/test");

        expect(result.endsWith("test")).toBeTruthy();
    });
});
