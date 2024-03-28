/**
 * @author WMXPY
 * @namespace Origin_Collection
 * @description Least Common Identifier
 * @override Unit Test
 */

import { mapLeastCommonIdentifier } from "../../../../src/origin/collection/least-common-identifier";

describe("Given [Least Common Identifier] Origin Collection Helper Methods", (): void => {

    test("Should be able map least common identifier for single id", (): void => {

        const result: Record<string, string> = mapLeastCommonIdentifier(
            [
                {
                    key: "aa",
                    identifier: "aa",
                },
            ],
        );

        expect(result).toStrictEqual({
            aa: "a",
        });
    });

    test("Should be able map least common identifier for single level ids", (): void => {

        const result: Record<string, string> = mapLeastCommonIdentifier(
            [
                {
                    key: "aa",
                    identifier: "aa",
                },
                {
                    key: "bb",
                    identifier: "bb",
                },
            ],
        );

        expect(result).toStrictEqual({
            aa: "a",
            bb: "b",
        });
    });

    test("Should be able map least common identifier for conflict level ids", (): void => {

        const result: Record<string, string> = mapLeastCommonIdentifier(
            [
                {
                    key: "aa",
                    identifier: "qaa",
                },
                {
                    key: "bb",
                    identifier: "qbb",
                },
            ],
        );

        expect(result).toStrictEqual({
            aa: "qa",
            bb: "qb",
        });
    });
});
