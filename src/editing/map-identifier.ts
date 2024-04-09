/**
 * @author WMXPY
 * @namespace Editing
 * @description Map Identifier
 */

import { mapLeastCommonIdentifier } from "@imbricate/core";
import { ActiveEditing } from "./definition";

export const mapEditingLeastCommonIdentifier = (
    activeEditingList: ActiveEditing[],
): Record<string, string> => {

    const identifierMap: Record<string, string> = mapLeastCommonIdentifier(
        activeEditingList.map((each: ActiveEditing) => {
            return {
                key: each.identifier,
                identifier: each.identifier,
            };
        }),
    );

    const fixedIdentifierMap: Record<string, string> = {};

    for (const key of Object.keys(identifierMap)) {
        const value: string = identifierMap[key];
        fixedIdentifierMap[key] = [
            "[",
            key.substring(0, value.length),
            "]",
            key.substring(value.length),
        ].join("");
    }

    return fixedIdentifierMap;
};
