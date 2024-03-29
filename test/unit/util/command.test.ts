/**
 * @author WMXPY
 * @namespace Util
 * @description Command
 * @override Unit Test
 */

import { Command } from "commander";
import { createConfiguredCommand } from "../../../src/util/command";

describe("Given [Command] Helper Methods", (): void => {

    test("should be able to create configured command", (): void => {

        const command: Command = createConfiguredCommand("command");

        expect(command.name()).toEqual("command");
    });

    test("should be able to configure help", (): void => {

        const command: Command = createConfiguredCommand("command");

        expect((command as any)._helpConfiguration.showGlobalOptions).toBeTruthy();
    });
});
