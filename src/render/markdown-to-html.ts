/**
 * @author WMXPY
 * @namespace Render
 * @description Markdown To HTML
 */

import { Converter } from "showdown";

export type RenderMarkdownToHtmlConfig = {

    readonly headerId: boolean;
    readonly tableHeaderId: boolean;
    readonly encodeEmails: boolean;
};

const createDefaultConfig = (): RenderMarkdownToHtmlConfig => {

    return {
        headerId: true,
        tableHeaderId: false,
        encodeEmails: true,
    };
};

export const renderMarkdownToHtml = async (
    markdown: string,
    config: Partial<RenderMarkdownToHtmlConfig> = {},
): Promise<string> => {

    const defaultConfig: RenderMarkdownToHtmlConfig = createDefaultConfig();
    const fixedConfig: RenderMarkdownToHtmlConfig = {
        ...defaultConfig,
        ...config,
    };

    const converter: Converter = new Converter();

    converter.setFlavor("github");

    converter.setOption("noHeaderId", !fixedConfig.headerId);
    converter.setOption("encodeEmails", fixedConfig.encodeEmails);

    converter.setOption("tables", true);
    converter.setOption("tablesHeaderId", fixedConfig.tableHeaderId);

    return converter.makeHtml(markdown);
};
