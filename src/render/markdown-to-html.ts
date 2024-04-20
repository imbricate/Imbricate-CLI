/**
 * @author WMXPY
 * @namespace Render
 * @description Markdown To HTML
 */

import { createMarkdownParser } from "./parser";

export const renderMarkdownToHtml = async (
    markdown: string,
): Promise<string> => {

    const parser = createMarkdownParser();

    const result = await parser.process(markdown);

    return String(result);
};
