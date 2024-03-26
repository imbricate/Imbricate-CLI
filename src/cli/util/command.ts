/**
 * @author WMXPY
 * @namespace CLI_Util
 * @description Command
 */

import { Command } from "commander";

export const createConfiguredCommand = (commandName: string): Command => {

    const command: Command = new Command(commandName);

    command
        .configureHelp({
            showGlobalOptions: true,
        });

    return command;
};
