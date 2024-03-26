/**
 * @author WMXPY
 * @namespace Origin
 * @description List
 * @override CLI Test
 */

import { executeWithConfiguration } from "../../../src/cli";
import { IConfigurationManager } from "../../../src/cli/configuration/interface";
import { MockConfigurationManager } from "../../mock/configuration-manager";
import { generateMockArguments } from "../../util/execute-command";

describe("Given CLI (Origin List) Operation", (): void => {

    test("should be able to list origins", (): void => {

        const configurationManager: IConfigurationManager
            = MockConfigurationManager.create(
                "configuration-path",
                {
                    origins: [],
                    activeOrigin: null,
                },
            );

        executeWithConfiguration(
            configurationManager,
            generateMockArguments("origin", "list"),
        );
    });
});
