/**
 * @author WMXPY
 * @namespace Render
 * @description Replace
 */

import { renderContentPlaceholder, renderTitlePlaceholder } from "./placeholder";

export type ReplaceTemplatePlaceholdersData = {

    readonly title: string;
    readonly content: string;
};

export const replaceTemplatePlaceholders = (
    template: string,
    data: ReplaceTemplatePlaceholdersData,
): string => {

    const titleRegex: RegExp = new RegExp(renderTitlePlaceholder, "g");
    const contentRegex: RegExp = new RegExp(renderContentPlaceholder, "g");

    return template
        .replace(titleRegex, data.title)
        .replace(contentRegex, data.content);
};
