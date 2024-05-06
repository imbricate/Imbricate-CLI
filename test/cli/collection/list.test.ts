/**
 * @author WMXPY
 * @namespace Collection
 * @description List
 * @override CLI Test
 */

import { executeWithConfiguration } from "../../../src/cli";
import { MockCollection } from "../../mock/collection";
import { MockConfigurationManager } from "../../mock/configuration-manager";
import { MockOrigin } from "../../mock/origin";
import { MockTerminalController } from "../../mock/terminal-controller";
import { generateMockArguments } from "../../util/execute-command";

describe("Given CLI (Collection List) Operation", (): void => {

    test("should be able to list empty collections", async (): Promise<void> => {

        const terminalController = MockTerminalController.create();

        const configurationManager: MockConfigurationManager
            = MockConfigurationManager.create(
                "configuration-path",
                {
                    origins: [{
                        originName: "test-origin",
                        originType: "mock",
                        uniqueIdentifier: "test-unique",
                        payloads: {},
                    }],
                    activeOrigin: "test-origin",
                    profiles: {},
                    defaultProfile: "default",
                },
            );

        const mockOrigin = MockOrigin.create();
        configurationManager.assignMockOrigin(mockOrigin);

        await executeWithConfiguration(
            terminalController,
            configurationManager,
            generateMockArguments("collection", "list"),
        );

        expect(terminalController.infoLogs).toStrictEqual([
            ["No collection found"],
        ]);
    });

    test("should be able to list single collection", async (): Promise<void> => {

        const terminalController = MockTerminalController.create();

        const configurationManager: MockConfigurationManager
            = MockConfigurationManager.create(
                "configuration-path",
                {
                    origins: [{
                        originName: "test-origin",
                        originType: "mock",
                        uniqueIdentifier: "test-unique",
                        payloads: {},
                    }],
                    activeOrigin: "test-origin",
                    profiles: {},
                    defaultProfile: "default",
                },
            );

        const mockOrigin = MockOrigin.create();
        configurationManager.assignMockOrigin(mockOrigin);

        const mockCollection = MockCollection.create();
        mockOrigin.collections.push(mockCollection);

        await executeWithConfiguration(
            terminalController,
            configurationManager,
            generateMockArguments("collection", "list"),
        );

        expect(terminalController.infoLogs).toStrictEqual([
            ["mock"],
        ]);
    });
});
