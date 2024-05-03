/**
 * @author WMXPY
 * @namespace Util
 * @description Input Parse
 */

import { CLIInputNumberError } from "../error/input/number-input";

export const inputParseBoolean = (value: string): boolean => {

    return value === "true";
};

export const inputParsePositiveInteger = (value: string): number => {

    const parsed: number = Number(value);
    if (isNaN(parsed)) {
        throw CLIInputNumberError.notANumber(value);
    }

    if (!Number.isInteger(parsed)) {
        throw CLIInputNumberError.notAInteger(parsed);
    }

    if (parsed < 0) {
        throw CLIInputNumberError.notPositive(parsed);
    }

    return parsed;
};

export const inputParseDirectories = (value: string): string[] => {

    return value
        .split("/")
        .map((item: string) => {
            return item.trim();
        })
        .filter((item: string) => {
            return item.length > 0;
        });
};
