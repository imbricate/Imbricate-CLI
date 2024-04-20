/**
 * @author WMXPY
 * @namespace Render
 * @description Markdown To HTML
 */

import { Converter } from "showdown";

export const renderMarkdownToHtml = async (
    markdown: string,
): Promise<string> => {

    const converter: Converter = new Converter();
    return converter.makeHtml(markdown);
};
