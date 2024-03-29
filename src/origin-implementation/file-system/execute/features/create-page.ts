/**
 * @author WMXPY
 * @namespace FileSystem_Execute_Features
 * @description Create Page
 */

import { IImbricateOrigin, IImbricateOriginCollection, SandboxFeature, SandboxFeatureBuilder } from "@imbricate/core";

type CreatePageInput = {

    readonly collection: string;
    readonly title: string;

    readonly content?: string;
};

type CreatePageOutput = {

    readonly title: string;
    readonly identifier: string;
};

const createImplementation = (
    origin: IImbricateOrigin,
) => {

    return async (
        input: CreatePageInput,
    ): Promise<CreatePageOutput> => {

        if (typeof input.collection !== "string") {
            throw new Error("Collection is required");
        }

        if (typeof input.title !== "string") {
            throw new Error("Title is required");
        }

        const collection: IImbricateOriginCollection | null =
            await origin.getCollection(input.collection);

        if (!collection) {
            throw new Error(`Collection [${input.collection}] not found`);
        }

        const pageExist: boolean = await collection.hasPage(input.title);

        if (pageExist) {
            throw new Error(`Page [${input.title}] already exist`);
        }

        const fixedContent: string = input.content ?? "";

        const response = await collection.createPage(input.title, fixedContent);

        return {
            title: response.title,
            identifier: response.identifier,
        };
    };
};

export const createCreatePageFeature = (
    origin: IImbricateOrigin,
): SandboxFeature => {

    return SandboxFeatureBuilder.fromScratch()
        .withPackageName("page")
        .withMethodName("createPage")
        .withImplementation(createImplementation(origin))
        .build();
};
