/**
 * @author WMXPY
 * @namespace Render
 * @description Replace
 */

export type ReplaceTemplatePlaceholdersData = {

    readonly title: string;
    readonly content: string;
};

export const replaceTemplatePlaceholders = (
    template: string,
    data: ReplaceTemplatePlaceholdersData,
): string => {

    return template
        .replace(/{{title}}/g, data.title)
        .replace(/{{content}}/g, data.content);
};
