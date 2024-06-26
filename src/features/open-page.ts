/**
 * @author WMXPY
 * @namespace Features
 * @description Open Page
 */

import { IImbricateCollection, IImbricateOrigin, IImbricatePage, SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";
import { SAVING_TARGET_TYPE, SavingTarget } from "@imbricate/local-fundamental";
import { IConfigurationManager } from "../configuration/interface";
import { getProfileFromConfiguration } from "../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../configuration/profile/profile-manager";
import { openContentAndMonitor } from "../editing/open-file";
import { createPageSavingTarget } from "../editing/saving-target/create-saving.target";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";

type OpenPageInput = {

    readonly collection: string;
    readonly identifier: string;

    readonly handsFree?: boolean;
};

const createImplementation = (
    origin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
) => {

    return async (
        input: OpenPageInput,
    ): Promise<void> => {

        if (typeof input.collection !== "string") {
            throw new Error("Collection is required");
        }

        if (typeof input.identifier !== "string") {
            throw new Error("Identifier is required");
        }

        const collection: IImbricateCollection | null =
            await origin
                .getCollectionManager()
                .findCollection(input.collection);

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
        const target: SavingTarget<SAVING_TARGET_TYPE.PAGE> = createPageSavingTarget(
            globalManager,
            collection.collectionName,
            collection.uniqueIdentifier,
            page.identifier,
        );

        await openContentAndMonitor(
            pageContent,
            `${page.title}.md`,
            target,
            globalManager,
            terminalController,
            profile,
            input.handsFree ?? true,
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
