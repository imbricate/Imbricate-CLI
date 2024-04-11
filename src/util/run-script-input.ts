/**
 * @author WMXPY
 * @namespace Util
 * @description Run Script Input
 */

export type ParsedRunScriptParameterInputResult = {

    readonly key: string;
    readonly value: any;
};

export const parseRunScriptParameterInput = (
    input: string,
): ParsedRunScriptParameterInputResult => {

    const parsedValue: string[] = input.split("=");

    if (parsedValue.length !== 2) {
        return {
            key: input,
            value: true,
        };
    }

    return {
        key: parsedValue[0],
        value: parsedValue[1],
    };
};
