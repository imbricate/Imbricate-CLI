/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description Show
 */

import { Command } from "commander";
import { GlobalManager } from "../../../util/global-manager";

type OriginShowCommandOptions = {

    readonly json?: boolean;
};

export const createOriginShowCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("show");
    callCommand
        .description("Show available origins")
        .option("-j, --json", "Print as JSON")
        .action(async (
            options: OriginShowCommandOptions,
        ): Promise<void> => {

            if (options.json) {

                console.log([...globalManager.origins.entries()]
                    .map(([origin, active]) => {
                        return {
                            originName: origin.originName,
                            active,
                        };
                    }));
                return;
            }

            console.log(globalManager.activeOrigins.map((origin) => {
                return origin.originName;
            }).join("\n"));

            return;
        });

    return callCommand;
};
