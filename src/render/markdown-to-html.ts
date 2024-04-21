/**
 * @author WMXPY
 * @namespace Render
 * @description Markdown To HTML
 */

import { Converter } from "showdown";

export type RenderMarkdownToHtmlConfig = {
    // Preferences
    readonly headerId: boolean;
    readonly encodeEmails: boolean;
    readonly simpleLineBreaks: boolean;

    // Tables
    readonly tableHeaderId: boolean;
};

const createDefaultConfig = (): RenderMarkdownToHtmlConfig => {

    return {
        // Preferences
        headerId: true,
        encodeEmails: true,
        simpleLineBreaks: true,

        // Tables
        tableHeaderId: false,
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

    // Preferences
    converter.setOption("noHeaderId", !fixedConfig.headerId);
    converter.setOption("encodeEmails", fixedConfig.encodeEmails);
    converter.setOption("simpleLineBreaks", fixedConfig.simpleLineBreaks);

    // Tables
    converter.setOption("tables", true);
    converter.setOption("tablesHeaderId", fixedConfig.tableHeaderId);

    return converter.makeHtml(markdown);
};
