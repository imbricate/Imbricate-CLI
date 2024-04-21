/**
 * @author WMXPY
 * @namespace Render
 * @description Template
 */

import { CLIRenderInvalidTemplate } from "../error/render/invalid-template";
import { renderContentPlaceholder } from "./placeholder";

export const ensureRenderTemplateValid = (
    template: string,
    templatePath: string,
): void => {

    if (!template.includes(renderContentPlaceholder)) {

        throw CLIRenderInvalidTemplate.replacerNotFound(
            templatePath,
            renderContentPlaceholder,
        );
    }
};
