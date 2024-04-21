/**
 * @author WMXPY
 * @namespace Commands_Script_Attribute
 * @description Set
 */

import { IImbricateOrigin, IImbricateScript } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../../global/global-manager";
import { cliGetScript } from "../../../script/get-script";
import { ITerminalController } from "../../../terminal/definition";
import { createActionRunner } from "../../../util/action-runner";
import { createConfiguredCommand } from "../../../util/command";

type ScriptAttributeSetCommandOptions = {

    readonly scriptName?: string;
    readonly identifier?: string;

    readonly quiet?: boolean;
};

export const createScriptAttributeSetCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const setCommand: Command = createConfiguredCommand("set");

    setCommand
        .description("set attribute of a script")
        .argument("<attribute-key>", "the key of the attribute")
        .argument("<attribute-value>", "the value of the attribute")
        .option(
            "-n, --script-name <script-name>",
            "set attribute by script name (one-of)",
        )
        .option(
            "-i, --identifier <script-identifier>",
            "set attribute by script identifier or pointer (one-of)",
        )
        .option("-q, --quiet", "quite mode")
        .action(createActionRunner(terminalController, async (
            attributeKey: string,
            attributeValue: string,
            options: ScriptAttributeSetCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const script: IImbricateScript = await cliGetScript(
                currentOrigin,
                options.scriptName,
                options.identifier,
            );

            await script.writeAttribute(attributeKey, attributeValue);

            if (!options.quiet) {
                terminalController.printInfo(`Attribute ${attributeKey} set to ${attributeValue}`);
            }
        }));

    return setCommand;
};
