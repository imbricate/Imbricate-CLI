/**
 * @author WMXPY
 * @namespace Render
 * @description Template
 */

import { renderContentPlaceholder } from "./placeholder";

export const verifyRenderTemplate = (template: string): boolean => {

    if (!template.includes(renderContentPlaceholder)) {
        return false;
    }

    return true;
};
