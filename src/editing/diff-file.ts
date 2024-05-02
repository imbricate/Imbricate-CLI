/**
 * @author WMXPY
 * @namespace Editing
 * @description Diff File
 */

import { resolveImbricateTempDirectory } from "@imbricate/local-fundamental";
import { attemptMarkDir, writeTextFile } from "@sudoo/io";
import { ConfigurationProfileManager } from "../configuration/profile/profile-manager";
import { CLIInvalidSavingTarget } from "../error/editing/invalid-saving-target";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { executeCommand } from "../util/execute-command";
import { SavingTarget } from "./definition";
import { getContentWithSavingTarget } from "./saving-target/get-content";

export const diffSavingTarget = async (
    afterPath: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    profile: ConfigurationProfileManager,
    terminalController: ITerminalController,
): Promise<void> => {

    const beforeContent: string | null =
        await getContentWithSavingTarget(savingTarget, globalManager);

    if (typeof beforeContent !== "string") {
        throw CLIInvalidSavingTarget.withSavingTarget(savingTarget);
    }

    const tempPath: string = resolveImbricateTempDirectory();
    await attemptMarkDir(tempPath);

    const tempDiffPath: string = resolveImbricateTempDirectory("diff");
    await writeTextFile(tempDiffPath, beforeContent);

    const fixedCommands: string[] = profile.getActiveDiffCommand()
        .map((command: string) => {
            return command
                .replace("{path1}", `${tempDiffPath}`)
                .replace("{path2}", `${afterPath}`);
        });

    await executeCommand(fixedCommands, terminalController);
};
