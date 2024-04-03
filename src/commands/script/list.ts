/**
 * @author WMXPY
 * @namespace Commands_Script
 * @description List
 */

import { IImbricateOrigin, ImbricateScriptSnapshot, mapLeastCommonIdentifier } from "@imbricate/core";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { CLIActiveOriginNotFound } from "../../error/origin/active-origin-not-found";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";

type ScriptListCommandOptions = {

    readonly json?: boolean;
    readonly pointer?: boolean;
};

const generateRawPrint = (
    scripts: ImbricateScriptSnapshot[],
    pointer: boolean,
): string => {

    if (!pointer) {
        return scripts
            .map((script: ImbricateScriptSnapshot) => {
                return script.scriptName;
            })
            .join("\n");
    }

    const mappedLeastCommonIdentifier: Record<string, string> =
        mapLeastCommonIdentifier(scripts.map((item) => {
            return {
                key: item.scriptName,
                identifier: item.identifier,
            };
        }));

    return scripts
        .map((script: ImbricateScriptSnapshot) => script.scriptName)
        .map((scriptName: string) => {
            return `[${mappedLeastCommonIdentifier[scriptName]}] -> ${scriptName}`;
        })
        .join("\n");
};

const generateJSONPrint = (
    scripts: ImbricateScriptSnapshot[],
    pointer: boolean,
): string => {

    if (!pointer) {
        return JSON.stringify(scripts.map((script) => {
            return {
                scriptName: script.scriptName,
                identifier: script.identifier,
            };
        }), null, 2);
    }

    const mappedLeastCommonIdentifier: Record<string, string> =
        mapLeastCommonIdentifier(scripts.map((item) => {
            return {
                key: item.scriptName,
                identifier: item.identifier,
            };
        }));

    return JSON.stringify(scripts.map((script) => {
        return {
            scriptName: script.scriptName,
            pointer: mappedLeastCommonIdentifier[script.scriptName],
            identifier: script.identifier,
        };
    }), null, 2);
};

export const createScriptListCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const listCommand: Command = createConfiguredCommand("list");

    listCommand
        .description("list standalone scripts")
        .option("-j, --json", "print result as JSON")
        .option("-np, --no-pointer", "not to map pointer")
        .action(createActionRunner(terminalController, async (
            options: ScriptListCommandOptions,
        ): Promise<void> => {

            const currentOrigin: IImbricateOrigin | null = globalManager.findCurrentOrigin();

            if (!currentOrigin) {
                throw CLIActiveOriginNotFound.create();
            }

            const scripts: ImbricateScriptSnapshot[] = await currentOrigin.listScripts();

            if (options.json) {

                terminalController.printInfo(generateJSONPrint(scripts, !!options.pointer));
                return;
            }

            if (scripts.length === 0) {
                terminalController.printInfo("No scripts found");
                return;
            }

            terminalController.printInfo(generateRawPrint(scripts, !!options.pointer));
        }));

    return listCommand;
};
