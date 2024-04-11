/**
 * @author WMXPY
 * @namespace Commands
 * @description Editing
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createEditingCleanCommand } from "./editing/clean";
import { createEditingDiffCommand } from "./editing/diff";
import { createEditingListCommand } from "./editing/list";
import { createEditingResumeCommand } from "./editing/resume";
import { createEditingSaveCommand } from "./editing/save";
import { createEditingSaveAllCommand } from "./editing/save-all";

export const createEditingCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const editingCommand: Command = createConfiguredCommand("editing");

    editingCommand
        .description("manage editing imbricate pages and scripts");

    editingCommand.addCommand(createEditingCleanCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createEditingDiffCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createEditingListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createEditingResumeCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createEditingSaveCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    editingCommand.addCommand(createEditingSaveAllCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return editingCommand;
};
