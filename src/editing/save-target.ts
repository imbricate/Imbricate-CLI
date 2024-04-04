/**
 * @author WMXPY
 * @namespace Editing
 * @description Save Target
 */

import { CLIEditingSaveTargetFiled } from "../error/editing/save-target-failed";
import { GlobalManager } from "../global/global-manager";
import { readActiveEditing, writeActiveEditing } from "./controller";
import { ActiveEditing, SAVING_TARGET_TYPE, SavingTarget } from "./definition";

export const hashSavingTarget = (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
): string => {

    switch (savingTarget.type) {

        case SAVING_TARGET_TYPE.PAGE: {

            const origin = savingTarget.payload.origin;
            const collection = (savingTarget as SavingTarget<SAVING_TARGET_TYPE.PAGE>).payload.collection;
            const identifier = savingTarget.payload.identifier;
            return `PAGE:${origin}:${collection}:${identifier}`;
        }
        case SAVING_TARGET_TYPE.SCRIPT: {

            const origin = savingTarget.payload.origin;
            const identifier = savingTarget.payload.identifier;
            return `SCRIPT:${origin}:${identifier}`;
        }
    }
};

export const performSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
    content: string,
    globalManager: GlobalManager,
): Promise<void> => {

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

            await page.writeContent(content);
            break;
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

            await script.writeScript(content);
            break;
        }
    }

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash = hashSavingTarget(savingTarget);
    const updatedActiveEditing: ActiveEditing[] = activeEditing.filter((item: ActiveEditing) => {
        return item.hash !== savingTargetHash;
    });

    await writeActiveEditing(updatedActiveEditing);
};
