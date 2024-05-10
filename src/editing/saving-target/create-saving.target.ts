/**
 * @author WMXPY
 * @namespace Editing_SavingTarget
 * @description Create Saving Target
 */

import { SAVING_TARGET_TYPE, SavingTarget } from "@imbricate/local-fundamental";
import { GlobalManager } from "../../global/global-manager";

export const createPageSavingTarget = (
    globalManager: GlobalManager,
    _collection: string,
    collectionUniqueIdentifier: string,
    pageIdentifier: string,
): SavingTarget<SAVING_TARGET_TYPE.PAGE> => {

    return {

        type: SAVING_TARGET_TYPE.PAGE,
        payload: {
            origin: globalManager.activeOrigin!,
            collection: collectionUniqueIdentifier,
            identifier: pageIdentifier,
        },
    };
};

export const createScriptSavingTarget = (
    globalManager: GlobalManager,
    scriptIdentifier: string,
): SavingTarget<SAVING_TARGET_TYPE.SCRIPT> => {

    return {

        type: SAVING_TARGET_TYPE.SCRIPT,
        payload: {
            origin: globalManager.activeOrigin!,
            identifier: scriptIdentifier,
        },
    };
};
