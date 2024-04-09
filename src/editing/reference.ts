/**
 * @author WMXPY
 * @namespace Editing
 * @description Reference
 */

import { ActiveEditing, SAVING_TARGET_TYPE, SavingTarget } from "./definition";

export const getActiveEditingReference = (
    activeEditing: ActiveEditing,
): string => {

    switch (activeEditing.target.type) {
        case SAVING_TARGET_TYPE.PAGE: {

            const fixedTarget = activeEditing.target as SavingTarget<SAVING_TARGET_TYPE.PAGE>;
            return [
                fixedTarget.payload.origin,
                fixedTarget.payload.collection,
                fixedTarget.payload.identifier,
            ].join(":");
        }
        case SAVING_TARGET_TYPE.SCRIPT: {

            const fixedTarget = activeEditing.target as SavingTarget<SAVING_TARGET_TYPE.SCRIPT>;
            return [
                fixedTarget.payload.origin,
                fixedTarget.payload.identifier,
            ].join(":");
        }
    }

    return "REFERENCE-UNKNOWN";
};
