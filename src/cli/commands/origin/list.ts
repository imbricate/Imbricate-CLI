/**
 * @author WMXPY
 * @namespace CLI_Commands_Origin
 * @description List
 */

import { Command } from "commander";
import { GlobalManager } from "../../../util/global-manager";

type OriginListCommandOptions = {

    readonly json?: boolean;
};

export const createOriginListCommand = (
    globalManager: GlobalManager,
): Command => {

    const callCommand = new Command("list");
    callCommand
        .description("List available origins")
        .option("-j, --json", "Print as JSON")
        .action(async (
            options: OriginListCommandOptions,
        ): Promise<void> => {

            const originNames: string[] = Object.keys(globalManager.origins);

            if (options.json) {

                console.log(JSON.stringify(originNames
                    .map((originName) => {
                        return {
                            originName,
                        };
                    }), null, 2));
                return;
            }

            console.log(originNames.map((origin) => {
                return origin;
            }).join("\n"));

            return;
        });

    return callCommand;
};
