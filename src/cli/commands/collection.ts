/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Collection
 */

import { Command } from "commander";
import { ConfigurationManager } from "../configuration/configuration-manager";
import { GlobalManager } from "../global/global-manager";
import { createConfiguredCommand } from "../util/command";
import { createCollectionCreateCommand } from "./collection/create";

export const createCollectionCommand = (
    globalManager: GlobalManager,
    configurationManager: ConfigurationManager,
): Command => {

    const collectionCommand: Command = createConfiguredCommand("collection");

    collectionCommand
        .description("create, read, update and delete collections")
        .alias("cl");

    collectionCommand.addCommand(createCollectionCreateCommand(globalManager, configurationManager));

    return collectionCommand;
};
