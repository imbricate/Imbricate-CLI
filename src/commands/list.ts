/**
 * @author WMXPY
 * @namespace Commands
 * @description List
 */

import { Command } from "commander";
import { GlobalManager } from "../util/global-manager";

type ListCommandOptions = {

    // PLACEHOLDER
};

export const createListCommand = (
    globalManager: GlobalManager,
): Command => {

    const listCommand = new Command("list");
    listCommand
        .description("List all the APIs")
        .action(async (_options: ListCommandOptions): Promise<void> => {

            console.log("List", globalManager.workingDirectory);
        });

    return listCommand;
};
