/**
 * @author WMXPY
 * @namespace Util
 * @description Fix Directory
 * @override Unit Test
 */

import { fixCurrentWorkingDirectory } from "../../../src/util/fix-directory";

describe("Given [Fix Directory] Helper Methods", (): void => {

    test("Should be able to resolve cwd direction with undefined", (): void => {

        const result: string = fixCurrentWorkingDirectory(undefined);

        expect(result).toEqual(process.cwd());
    });

    test("Should be able to resolve cwd direction with empty", (): void => {

        const result: string = fixCurrentWorkingDirectory("");

        expect(result).toEqual(process.cwd());
    });

    test("Should be able to resolve cwd direction with absolute", (): void => {

        const result: string = fixCurrentWorkingDirectory("/test");

        expect(result.endsWith("test")).toBeTruthy();
    });
});
