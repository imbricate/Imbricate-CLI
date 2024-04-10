/**
 * @author WMXPY
 * @namespace Editing
 * @description Diff File
 */

import { attemptMarkDir, writeTextFile } from "@sudoo/io";
import { ConfigurationProfileManager } from "../configuration/profile/profile-manager";
import { CLIInvalidSavingTarget } from "../error/editing/invalid-saving-target";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { executeCommand } from "../util/execute-command";
import { fixImbricateTempDirectory } from "../util/fix-directory";
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

    if (!beforeContent) {
        throw CLIInvalidSavingTarget.withSavingTarget(savingTarget);
    }

    const tempPath: string = fixImbricateTempDirectory();
    await attemptMarkDir(tempPath);

    const tempDiffPath: string = fixImbricateTempDirectory("diff");
    await writeTextFile(tempDiffPath, beforeContent);

    const fixedCommand: string = profile.getActiveDiffCommand()
        .replace("{path1}", `"${tempDiffPath}"`)
        .replace("{path2}", `"${afterPath}"`);

    await executeCommand(fixedCommand, terminalController);
};
