/**
 * @author WMXPY
 * @namespace Origin
 * @description List
 * @override CLI Test
 */

import { executeWithConfiguration } from "../../../src/cli";
import { IConfigurationManager } from "../../../src/cli/configuration/interface";
import { MockConfigurationManager } from "../../mock/configuration-manager";
import { MockTerminalController } from "../../mock/terminal-controller";
import { generateMockArguments } from "../../util/execute-command";

describe("Given CLI (Origin List) Operation", (): void => {

    test("should be able to list empty origins", async (): Promise<void> => {

        const terminalController = MockTerminalController.create();

        const configurationManager: IConfigurationManager
            = MockConfigurationManager.create(
                "configuration-path",
                {
                    origins: [],
                    activeOrigin: null,
                },
            );

        await executeWithConfiguration(
            terminalController,
            configurationManager,
            generateMockArguments("origin", "list"),
        );

        expect(terminalController.infoLogs).toStrictEqual([
            ["No origins found"],
        ]);
    });

    test("should be able to list empty origins in JSON format", async (): Promise<void> => {

        const terminalController = MockTerminalController.create();

        const configurationManager: IConfigurationManager
            = MockConfigurationManager.create(
                "configuration-path",
                {
                    origins: [],
                    activeOrigin: null,
                },
            );

        await executeWithConfiguration(
            terminalController,
            configurationManager,
            generateMockArguments("origin", "list", "-j"),
        );

        expect(terminalController.infoLogs).toStrictEqual([
            ["[]"],
        ]);
    });
});
