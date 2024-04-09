/**
 * @author WMXPY
 * @namespace Editing_SavingTarget
 * @description Get Content
 */

import { CLIEditingSaveTargetFiled } from "../../error/editing/save-target-failed";
import { GlobalManager } from "../../global/global-manager";
import { SAVING_TARGET_TYPE, SavingTarget } from "./../definition";

export const getContentWithSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
    globalManager: GlobalManager,
): Promise<string | null> => {

    switch (savingTarget.type) {
        case SAVING_TARGET_TYPE.PAGE: {

            const fixedTarget: SavingTarget<SAVING_TARGET_TYPE.PAGE> =
                savingTarget as SavingTarget<SAVING_TARGET_TYPE.PAGE>;

            const origin = globalManager.getOrigin(fixedTarget.payload.origin);
            if (!origin) {
                throw CLIEditingSaveTargetFiled.originNotFound(fixedTarget.payload.origin);
            }

            const collection = await origin.getCollection(fixedTarget.payload.collection);
            if (!collection) {
                throw CLIEditingSaveTargetFiled.collectionNotFound(fixedTarget.payload.collection);
            }

            const page = await collection.getPage(fixedTarget.payload.identifier);
            if (!page) {
                throw CLIEditingSaveTargetFiled.pageNotFound(fixedTarget.payload.identifier);
            }

            return await page.readContent();
        }
        case SAVING_TARGET_TYPE.SCRIPT: {

            const origin = globalManager.getOrigin(savingTarget.payload.origin);
            if (!origin) {
                throw CLIEditingSaveTargetFiled.originNotFound(savingTarget.payload.origin);
            }

            const script = await origin.getScript(savingTarget.payload.identifier);
            if (!script) {
                throw CLIEditingSaveTargetFiled.scriptNotFound(savingTarget.payload.identifier);
            }

            return await script.readScript();
        }
    }

    return null;
};
