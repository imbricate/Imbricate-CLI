/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description Create
 */

import { IImbricateOrigin, IImbricateScript, ImbricateScriptSnapshot } from "@imbricate/core";
import { SAVING_TARGET_TYPE, SavingTarget, validateFilename } from "@imbricate/local-fundamental";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { getProfileFromConfiguration } from "../../configuration/profile/get-profile";
import { ConfigurationProfileManager } from "../../configuration/profile/profile-manager";
import { openContentAndMonitor } from "../../editing/open-file";
import { createScriptSavingTarget } from "../../editing/saving-target/create-saving.target";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { CLIInvalidScriptName } from "../../error/script/invalid-script-name";
import { CLIScriptAlreadyExists } from "../../error/script/script-already-exists";
import { CLIScriptNotFound } from "../../error/script/script-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptCreateCommandOptions = {

    readonly open?: boolean;
    readonly quiet?: boolean;

    readonly handsFree?: boolean;
};

export const createScriptCreateCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const createCommand: Command = createConfiguredCommand("create");

    createCommand
        .description("create a new standalone script")
        .option("-q, --quiet", "quite mode")
        .option("-no, --no-open", "do not open the page after creation")
        .option("-h, --hands-free", "open the created page without monitoring the file changes")
        .argument("<script-name>", "name of the script")
        .action(createActionRunner(terminalController, async (
            scriptName: string,
            options: ScriptCreateCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const validateResult: string | null = validateFilename(scriptName);
            if (validateResult !== null) {
                throw CLIInvalidScriptName.withScriptName(scriptName, validateResult);
            }

            const hasScript: boolean = await currentOrigin.hasScript(scriptName);

            if (hasScript) {
                throw CLIScriptAlreadyExists.withScriptName(scriptName);
            }

            const profile: ConfigurationProfileManager = getProfileFromConfiguration(
                globalManager,
                terminalController,
                configurationManager,
                options.quiet,
            );

            const scriptMetadata: ImbricateScriptSnapshot =
                await currentOrigin.createScript(scriptName, "");

            if (!options.quiet) {
                terminalController.printInfo(`Script "${scriptMetadata.scriptName}" created`);
                terminalController.printInfo(`Identifier: ${scriptMetadata.identifier}`);
            }

            if (options.open) {

                if (!options.quiet) {
                    terminalController.printInfo(`Opening script "${scriptMetadata.scriptName}"`);
                }

                const script: IImbricateScript | null =
                    await currentOrigin.getScript(scriptMetadata.identifier);

                if (!script) {
                    throw CLIScriptNotFound.withScriptIdentifier(scriptMetadata.identifier);
                }

                const scriptContent: string = await script.readScript();
                const target: SavingTarget<SAVING_TARGET_TYPE.SCRIPT> = createScriptSavingTarget(
                    globalManager,
                    scriptMetadata.identifier,
                );

                await openContentAndMonitor(
                    scriptContent,
                    `${scriptMetadata.scriptName}.js`,
                    target,
                    globalManager,
                    terminalController,
                    profile,
                    options.handsFree ?? false,
                );
            }
        }));

    return createCommand;
};
