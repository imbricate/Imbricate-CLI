/**
 * @author WMXPY
 * @namespace Render
 * @description Markdown To HTML
 */

import { Converter } from "showdown";

export type RenderMarkdownToHtmlConfig = {

    readonly emoji: boolean;
    readonly encodeEmails: boolean;
    readonly headerId: boolean;
    readonly simpleLineBreaks: boolean;
    readonly tableHeaderId: boolean;
};

const createDefaultConfig = (): RenderMarkdownToHtmlConfig => {

    return {

        emoji: true,
        encodeEmails: true,
        headerId: true,
        simpleLineBreaks: true,
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

    // Features
    converter.setOption("tables", true);
    converter.setOption("moreStyling", true);

    // Preferences
    converter.setOption("emoji", fixedConfig.emoji);
    converter.setOption("encodeEmails", fixedConfig.encodeEmails);
    converter.setOption("noHeaderId", !fixedConfig.headerId);
    converter.setOption("simpleLineBreaks", fixedConfig.simpleLineBreaks);
    converter.setOption("tablesHeaderId", fixedConfig.tableHeaderId);

    return converter.makeHtml(markdown);
};
