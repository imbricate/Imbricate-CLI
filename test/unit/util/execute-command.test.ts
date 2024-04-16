/**
 * @author WMXPY
 * @namespace Util
 * @description Execute Command
 * @override Unit Test
 */

import { executeCommand } from "../../../src/util/execute-command";
import { MockTerminalController } from "../../mock/terminal-controller";

describe("Given [Execute Command] Helper Methods", (): void => {

    test("should be able to execute echo command", async (): Promise<void> => {

        const terminalController = MockTerminalController.create();

        await executeCommand(
            ["echo", "hello", "world"],
            terminalController,
        );

        expect(terminalController.infoLogs).toHaveLength(1);
        expect(terminalController.infoLogs[0]).toHaveLength(1);
        expect(terminalController.infoLogs[0][0].includes("[COMMAND] hello world")).toBeTruthy();
    });
});
