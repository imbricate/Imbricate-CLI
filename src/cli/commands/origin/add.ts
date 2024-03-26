/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description Add
 */

import { Command } from "commander";
import { GlobalManagerOriginResponse } from "../../global/definition";
import { GlobalManager } from "../../global/global-manager";
import { createConfiguredCommand } from "../../util/command";
import { createOriginAddFileSystemCommand } from "./add/file-system";

type OriginAddCommandOptions = {

    readonly quiet?: boolean;
};

export const createOriginAddCommand = (
    globalManager: GlobalManager,
): Command => {

    const addCommand: Command = createConfiguredCommand("add");

    addCommand
        .description("add new origin")
        .option("-q, --quiet", "quite mode")
        .action(async (
            _options: OriginAddCommandOptions,
        ): Promise<void> => {

            const origins: GlobalManagerOriginResponse[] = globalManager.origins;

            console.log(origins);

            return;
        });

    addCommand.addCommand(createOriginAddFileSystemCommand(globalManager));

    return addCommand;
};
