/**
 * @author WMXPY
 * @namespace Features
 * @description Start Page Improvement
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage, SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";
import { IConfigurationManager } from "../configuration/interface";
import { getProfileFromConfiguration } from "../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../configuration/profile/profile-manager";
import { SAVING_TARGET_TYPE, SavingTarget } from "../editing/definition";
import { checkHasActiveEditing } from "../editing/editing";
import { openContentAndDiff } from "../editing/open-file";
import { createPageSavingTarget } from "../editing/saving-target/create-saving.target";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";

type StartPageEditingInput = {

    readonly collection: string;
    readonly identifier: string;

    readonly initialContent: string;
};

const createImplementation = (
    origin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
) => {

    return async (
        input: StartPageEditingInput,
    ): Promise<void> => {

        if (typeof input.collection !== "string") {
            throw new Error("Collection is required");
        }

        if (typeof input.identifier !== "string") {
            throw new Error("Identifier is required");
        }

        if (typeof input.initialContent !== "string") {
            throw new Error("Initial Content is required");
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

        const target: SavingTarget<SAVING_TARGET_TYPE.PAGE> = createPageSavingTarget(
            globalManager,
            collection.collectionName,
            page.identifier,
        );

        const hasActiveEditing: boolean = await checkHasActiveEditing(target);

        if (hasActiveEditing) {
            throw new Error(`Page [${page.title}] is currently being edited`);
        }

        const profile: ConfigurationProfileManager = getProfileFromConfiguration(
            globalManager,
            terminalController,
            configurationManager,
        );

        await openContentAndDiff(
            input.initialContent,
            `${page.title}.md`,
            target,
            globalManager,
            terminalController,
            profile,
        );
    };
};

export const createStartPageImprovementFeature = (
    origin: IImbricateOrigin,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): SandboxFeature => {

    return SandboxFeatureBuilder.providedByInterface()
        .withPackageName("page")
        .withMethodName("startPageImprovement")
        .withImplementation(createImplementation(
            origin,
            globalManager,
            terminalController,
            configurationManager,
        ))
        .build();
};