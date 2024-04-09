/**
 * @author WMXPY
 * @namespace Editing
 * @description Diff File
 */

import { attemptMarkDir, writeTextFile } from "@sudoo/io";
import { CLIInvalidSavingTarget } from "../error/editing/invalid-saving-target";
import { GlobalManager } from "../global/global-manager";
import { executeCommand } from "../util/execute-command";
import { fixImbricateTempDirectory } from "../util/fix-directory";
import { SavingTarget } from "./definition";
import { getContentWithSavingTarget } from "./saving-target/get-content";
import { IConfigurationManager } from "../configuration/interface";

export const diffSavingTarget = async (
    afterPath: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    configurationManager: IConfigurationManager,
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

    const fixedCommand: string = configurationManager.getActiveDiffCommand()
        .replace("{path1}", `"${tempDiffPath}"`)
        .replace("{path2}", `"${afterPath}"`);

    await executeCommand(fixedCommand);
};
