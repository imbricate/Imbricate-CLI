/**
 * @author WMXPY
 * @namespace Terminal
 * @description Open File
 */

import { attemptMarkDir, readTextFile, removeFile, writeTextFile } from "@sudoo/io";
import { UUIDVersion1 } from "@sudoo/uuid";
import { executeCommand } from "../util/execute-command";
import { fixImbricateTempDirectory } from "../util/fix-directory";
import { readActiveEditing, writeActiveEditings } from "./controller";
import { ActiveEditing, SavingTarget } from "./definition";
import { hashSavingTarget, performSavingTarget } from "./save-target";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { ConfigurationManager } from "../configuration/configuration-manager";
import { IConfigurationManager } from "../configuration/interface";

export const openContentAndMonitor = async (
    content: string,
    fileName: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Promise<void> => {

    const uuid: string = UUIDVersion1.generateString();

    const tempPath: string = fixImbricateTempDirectory();
    await attemptMarkDir(tempPath);

    const activeEditings = await readActiveEditing();

    const command = configurationManager.getActiveEditingCommand(false);
    const savingTargetHash = hashSavingTarget(savingTarget);
    
    for (const editing of activeEditings) {
        if (editing.hash === savingTargetHash) {

            terminalController.printInfo("Unsaved change found, opening...");
            await openFileAndMonitor(command, editing.path);

            const updatedContent: string = await readTextFile(editing.path);

            terminalController.printInfo("Saving...");
            await performSavingTarget(savingTarget, updatedContent, globalManager);
            terminalController.printInfo("Edit Saved");

            await removeFile(editing.path);
            return;
        }
    }

    const tempFilePath: string = fixImbricateTempDirectory(fileName);

    const currentTime: Date = new Date();
    const updatedActiveEditings: ActiveEditing[] = [
        ...activeEditings,
        {
            hash: savingTargetHash,
            path: tempFilePath,
            startedAt: currentTime,
            target: savingTarget,
        }
    ];

    await writeActiveEditings(updatedActiveEditings);

    await writeTextFile(tempFilePath, content);

    terminalController.printInfo("Opening...");
    await openFileAndMonitor(command, tempFilePath);

    const updatedContent: string = await readTextFile(tempFilePath);

    terminalController.printInfo("Saving...");
    await performSavingTarget(savingTarget, updatedContent, globalManager);
    terminalController.printInfo("Edit Saved");

    await removeFile(tempFilePath);
};

export const openFileAndMonitor = async (command: string, path: string): Promise<string> => {

    const fixedCommand: string = command
        .replace("{path}", `"${path}"`);

    const output = await executeCommand(fixedCommand);

    return output;
};
