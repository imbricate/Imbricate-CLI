/**
 * @author WMXPY
 * @namespace Commands
 * @description Page
 */

import { Command } from "commander";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { createConfiguredCommand } from "../util/command";
import { createPageAttributeCommand } from "./page/attribute";
import { createPageCatenateCommand } from "./page/catenate";
import { createPageCopyCommand } from "./page/copy";
import { createPageCreateCommand } from "./page/create";
import { createPageDeleteCommand } from "./page/delete";
import { createPageListCommand } from "./page/list";
import { createPageOpenCommand } from "./page/open";
import { createPageRenderCommand } from "./page/render";
import { createPageRetitleCommand } from "./page/retitle";
import { createPageShowCommand } from "./page/show";

export const createPageCommand = (
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Command => {

    const pageCommand: Command = createConfiguredCommand("page");

    pageCommand
        .description("manage imbricate pages");

    pageCommand.addCommand(createPageAttributeCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageCatenateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageCopyCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageCreateCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageDeleteCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageListCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageOpenCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageRenderCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageRetitleCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));
    pageCommand.addCommand(createPageShowCommand(
        globalManager,
        terminalController,
        configurationManager,
    ));

    return pageCommand;
};
