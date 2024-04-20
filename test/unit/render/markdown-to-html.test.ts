/**
 * @author WMXPY
 * @namespace Parser
 * @description Markdown To HTML
 * @override Unit Test
 */

import { renderMarkdownToHtml } from "../../../src/render/markdown-to-html";

describe("Given [Markdown to HTML] Parser Helper Methods", (): void => {

    test("should be able to parse simple markdown to HTML", async (): Promise<void> => {

        const source: string = "# Hello World";

        const parsed: string = await renderMarkdownToHtml(source);

        expect(parsed).toEqual("<h1>Hello World</h1>");
    });
});
