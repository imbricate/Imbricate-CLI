/**
 * @author WMXPY
 * @namespace Page
 * @description Get Page
 */

import { IImbricateOrigin, IImbricateOriginCollection, IImbricatePage, ImbricatePageSnapshot } from "@imbricate/core";
import { CLICollectionNotFound } from "../error/collection/collection-not-found";
import { CLIPageInvalidInput } from "../error/page/page-invalid-input";
import { CLIPageNotFound } from "../error/page/page-not-found";

export const cliGetPage = async (
    currentOrigin: IImbricateOrigin,
    collectionName: string,
    directories: string[],
    title?: string,
    identifier?: string,
): Promise<IImbricatePage> => {

    if (!title && !identifier) {
        throw CLIPageInvalidInput.withMessage("One of --title or --identifier is required");
    }

    const collection: IImbricateOriginCollection | null
        = await currentOrigin.findCollection(collectionName);

    if (!collection) {
        throw CLICollectionNotFound.withCollectionName(collectionName);
    }

    const pages: ImbricatePageSnapshot[] =
        await collection.listPages(directories, false);

    if (typeof title === "string" && title.length > 0) {

        const pageSnapshot: ImbricatePageSnapshot | undefined = pages.find((
            each: ImbricatePageSnapshot,
        ) => {
            return each.title === title;
        });

        if (!pageSnapshot) {
            throw CLIPageNotFound.withPageTitle(title);
        }

        const page = await collection.getPage(pageSnapshot.identifier);

        if (!page) {
            throw CLIPageNotFound.withPageIdentifier(pageSnapshot.identifier);
        }

        return page;
    }

    if (typeof identifier === "string" && identifier.length > 0) {

        for (const pageSnapshot of pages) {

            if (pageSnapshot.identifier.startsWith(identifier)) {

                const page = await collection.getPage(pageSnapshot.identifier);

                if (!page) {
                    throw CLIPageNotFound.withPageIdentifier(pageSnapshot.identifier);
                }

                return page;
            }
        }

        throw CLIPageNotFound.withPageIdentifier(identifier);
    }

    throw CLIPageNotFound.withUnknownIssue();
};
