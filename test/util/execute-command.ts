/**
 * @author WMXPY
 * @namespace Util
 * @description Execute Command
 * @override Test Util
 */

export const generateMockArguments = (
    ...commands: string[]
): string[] => {

    return [
        "node",
        "script",
        ...commands,
    ];
};
