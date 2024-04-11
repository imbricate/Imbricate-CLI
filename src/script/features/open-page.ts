/**
 * @author WMXPY
 * @namespace Script_Features
 * @description Open Page
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage, SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { SAVING_TARGET_TYPE, SavingTarget } from "../../editing/definition";
import { openContentAndMonitor } from "../../editing/open-file";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";

type CreatePageInput = {

    readonly collection: string;
    readonly identifier: string;
};

const createImplementation = (
    origin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
) => {

    return async (
        input: CreatePageInput,
    ): Promise<void> => {

        if (typeof input.collection !== "string") {
            throw new Error("Collection is required");
        }

        if (typeof input.identifier !== "string") {
            throw new Error("Identifier is required");
        }

        const collection: IImbricateOriginCollection | null =
            await origin.getCollection(input.collection);

        if (!collection) {
            throw new Error(`Collection [${input.collection}] not found`);
        }

        const page: IImbricatePage | null = await collection.getPage(input.identifier);

        if (!page) {
            throw new Error(`Page [${input.identifier}] not found`);
        }

        const profile: ConfigurationProfileManager = getProfileFromConfiguration(
            globalManager,
            terminalController,
            configurationManager,
        );

        const pageContent: string = await page.readContent();
        const target: SavingTarget<SAVING_TARGET_TYPE.PAGE> = {

            type: SAVING_TARGET_TYPE.PAGE,
            payload: {
                origin: globalManager.activeOrigin!,
                collection: collection.collectionName,
                identifier: page.identifier,
            },
        };

        await openContentAndMonitor(
            pageContent,
            `${page.title}.md`,
            target,
            globalManager,
            terminalController,
            profile,
            true,
        );
    };
};

export const createOpenPageFeature = (
    origin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): SandboxFeature => {

    return SandboxFeatureBuilder.providedByInterface()
        .withPackageName("page")
        .withMethodName("openPage")
        .withImplementation(createImplementation(
            origin,
            globalManager,
            terminalController,
            configurationManager,
        ))
        .build();
};
