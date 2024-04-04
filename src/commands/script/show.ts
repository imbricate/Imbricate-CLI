/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Show
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptSnapshot } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIScriptInvalidInput } from "../../error/script/script-invalid-input";
import { CLIScriptNotFound } from "../../error/script/script-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptShowCommandOptions = {

    readonly json?: boolean;

    readonly scriptName?: string;
    readonly identifier?: string;
};

const getScript = async (
    options: ScriptShowCommandOptions,
    globalManager: GlobalManager,
): Promise<IImbricateScript> => {

    if (!options.scriptName && !options.identifier) {
        throw CLIScriptInvalidInput.withMessage("One of --script-name or --identifier is required");
    }

    const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

    if (!currentOrigin) {
        throw CLIActiveOriginNotFound.create();
    }

    const scriptSnapshots: ImbricateScriptSnapshot[] = await currentOrigin.listScripts();

    if (typeof options.scriptName === "string") {

        const scriptSnapshot: ImbricateScriptSnapshot | undefined =
            scriptSnapshots.find((each: ImbricateScriptSnapshot) => {
                return each.scriptName === options.scriptName;
            });

        if (!scriptSnapshot) {
            throw CLIScriptNotFound.withScriptName(`Script "${options.scriptName}" not found`);
        }

        const script = await currentOrigin.getScript(scriptSnapshot.identifier);

        if (!script) {
            throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier "${scriptSnapshot.identifier}" not found`);
        }

        return script;
    }

    if (typeof options.identifier === "string" && options.identifier.length > 0) {

        for (const each of scriptSnapshots) {

            if (each.identifier.startsWith(options.identifier)) {

                const script = await currentOrigin.getScript(each.identifier);

                if (!script) {
                    throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier "${each.identifier}" not found`);
                }

                return script;
            }
        }
    }

    throw CLIScriptNotFound.withScriptIdentifier(`Script with identifier or pointer "${options.identifier}" not found`);
};

export const createScriptShowCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const showCommand: Command = createConfiguredCommand("show");

    showCommand
        .description("show details of a existing standalone script")
        .option("-j, --json", "print result as JSON")
        .option(
            "-s, --script-name <script-name>",
            "delete page by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "delete page by script identifier or pointer (one-of)",
        )
        .action(createActionRunner(terminalController, async (
            options: ScriptShowCommandOptions,
        ): Promise<void> => {

            const script: IImbricateScript = await getScript(options, globalManager);

            if (options.json) {

                terminalController.printInfo(JSON.stringify({
                    scriptName: script.scriptName,
                    identifier: script.identifier,
                    createdAt: script.createdAt.toISOString(),
                    updatedAt: script.updatedAt.toISOString(),
                }, null, 2));
                return;
            }

            const textOutput: string = [
                `Script Name: ${script.scriptName}`,
                `Identifier: ${script.identifier}`,
                `Created At: ${script.createdAt.toLocaleString()}`,
                `Updated At: ${script.updatedAt.toLocaleString()}`,
            ].join("\n");

            terminalController.printInfo(textOutput);
        }));

    return showCommand;
};
