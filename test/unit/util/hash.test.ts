/**
 * @author WMXPY
 * @namespace Util
 * @description Command
 * @override Unit Test
 */

import { hashString } from "@sudoo/io";

describe("Given [Hash] Helper Methods", (): void => {

    test("should be able to hash a given string", (): void => {

        const value: string = hashString("hello");

        expect(value).toEqual("5d41402abc4b2a76b9719d911017c592");
    });
});
