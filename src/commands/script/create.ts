/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Create
 */

import { IImbricateOrigin, ImbricateScriptMetadata } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIScriptAlreadyExists } from "../../error/script/script-already-exists";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptCreateCommandOptions = {

    readonly open?: boolean;
    readonly quiet?: boolean;
};

export const createScriptCreateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new standalone script")
        .option("-q, --quiet", "quite mode")
        .option("-no, --no-open", "do not open the page after creation")
        .argument("<script-name>", "name of the script")
        .action(createActionRunner(terminalController, async (
            scriptName: string,
            options: ScriptCreateCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const hasScript: boolean = await currentOrigin.hasScript(scriptName);

            if (hasScript) {
                throw CLIScriptAlreadyExists.withScriptName(scriptName);
            }

            const scriptMetadata: ImbricateScriptMetadata =
                await currentOrigin.createScript(scriptName);

            if (!options.quiet) {
                terminalController.printInfo(`Script "${scriptMetadata.scriptName}" created`);
                terminalController.printInfo(`Identifier: ${scriptMetadata.identifier}`);
            }

            if (options.open) {
                await currentOrigin.openScript(scriptMetadata.identifier);
            }
        }));

    return createCommand;
};
