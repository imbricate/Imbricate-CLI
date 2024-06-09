/**
 * @author WMXPY
 * @namespace Script
 * @description Get Script
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptSnapshot } from "@imbricate/core";
import { CLIScriptInvalidInput } from "../error/script/script-invalid-input";
import { CLIScriptNotFound } from "../error/script/script-not-found";

export const cliGetScript = async (
    origin: IImbricateOrigin,
    scriptName?: string,
    identifier?: string,
): Promise<IImbricateScript> => {

    if (!scriptName && !identifier) {
        throw CLIScriptInvalidInput.withMessage("One of --script-name or --identifier is required");
    }

    const scriptSnapshots: ImbricateScriptSnapshot[] = await origin
        .getScriptManager()
        .listScripts();

    if (typeof scriptName === "string") {

        const scriptSnapshot: ImbricateScriptSnapshot | undefined =
            scriptSnapshots.find((each: ImbricateScriptSnapshot) => {
                return each.scriptName === scriptName;
            });

        if (!scriptSnapshot) {
            throw CLIScriptNotFound.withScriptName(`Script "${scriptName}" not found`);
        }

        const script = await origin
            .getScriptManager()
            .getScript(scriptSnapshot.identifier);

        if (!script) {
            throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier "${scriptSnapshot.identifier}" not found`);
        }

        return script;
    }

    if (typeof identifier === "string" && identifier.length > 0) {

        for (const each of scriptSnapshots) {

            if (each.identifier.startsWith(identifier)) {

                const script = await origin
                    .getScriptManager()
                    .getScript(each.identifier);

                if (!script) {
                    throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier "${each.identifier}" not found`);
                }

                return script;
            }
        }
    }

    throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${identifier}" not found`);
};
