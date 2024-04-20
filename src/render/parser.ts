/**
 * @author WMXPY
 * @namespace Render
 * @description Parser
 */

import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

export const createMarkdownParser = () => {

    const parser = unified()
        .use(remarkParse)
        .use(remarkHtml);

    return parser;
};
