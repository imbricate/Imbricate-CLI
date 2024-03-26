/**
 * @author WMXPY
 * @namespace CLI_Commands
 * @description Collection
 */

import { Command } from "commander";
import { GlobalManager } from "../../util/global-manager";
import { createCollectionCreateCommand } from "./collection/create";

export const createCollectionCommand = (
    globalManager: GlobalManager,
): Command => {

    const collectionCommand = new Command("collection");

    collectionCommand
        .description("create, read, update and delete collections")
        .alias("cl")
        .addCommand(createCollectionCreateCommand(globalManager));

    collectionCommand
        .configureHelp({
            showGlobalOptions: true,
        });

    return collectionCommand;
};
