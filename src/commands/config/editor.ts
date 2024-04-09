/**
 * @author WMXPY
 * @namespace Commands_Config
 * @description Editor
 */

import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createConfiguredCommand } from "../../util/command";
import { createConfigEditorListCommand } from "./editor/list";
import { createConfigEditorShowCommand } from "./editor/show";
import { createConfigEditorUseCommand } from "./editor/use";

export const createConfigEditorCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const editor: Command = createConfiguredCommand("editor");

    editor
        .description("manager imbricate editor configurations");

    editor.addCommand(createConfigEditorListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editor.addCommand(createConfigEditorShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editor.addCommand(createConfigEditorUseCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return editor;
};
