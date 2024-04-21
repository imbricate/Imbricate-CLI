/**
 * @author WMXPY
 * @namespace Render
 * @description Markdown To HTML
 */

import { Converter } from "showdown";

export type RenderMarkdownToHtmlConfig = {

    readonly emoji: boolean;
    readonly encodeEmails: boolean;
    readonly simpleLineBreaks: boolean;
    readonly simplifiedAutoLink: boolean;
    readonly tableHeaderId: boolean;
};

const createDefaultConfig = (): RenderMarkdownToHtmlConfig => {

    return {

        emoji: true,
        encodeEmails: true,
        simpleLineBreaks: true,
        simplifiedAutoLink: true,
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
    converter.setOption("customizedHeaderId", true);
    converter.setOption("ghCodeBlocks", true);
    converter.setOption("ghCompatibleHeaderId", true);
    converter.setOption("moreStyling", true);
    converter.setOption("noHeaderId", false);
    converter.setOption("omitExtraWLInCodeBlocks", true);
    converter.setOption("strikethrough", true);
    converter.setOption("tables", true);
    converter.setOption("tasklists", true);

    // Preferences
    converter.setOption("emoji", fixedConfig.emoji);
    converter.setOption("encodeEmails", fixedConfig.encodeEmails);
    converter.setOption("simpleLineBreaks", fixedConfig.simpleLineBreaks);
    converter.setOption("simplifiedAutoLink", fixedConfig.simplifiedAutoLink);
    converter.setOption("tablesHeaderId", fixedConfig.tableHeaderId);

    return converter.makeHtml(markdown);
};
