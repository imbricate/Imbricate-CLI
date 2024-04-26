/**
 * @author WMXPY
 * @namespace Editing
 * @description Editing
 */

import { readActiveEditing } from "@imbricate/local-fundamental";
import { SavingTarget } from "./definition";
import { hashSavingTarget } from "./save-target";

export const checkHasActiveEditing = async (
    savingTarget: SavingTarget<any>,
): Promise<boolean> => {

    const activeEditing = await readActiveEditing();

    const savingTargetHash = hashSavingTarget(savingTarget);

    for (const editing of activeEditing) {
        if (editing.hash === savingTargetHash) {
            return true;
        }
    }

    return false;
};
