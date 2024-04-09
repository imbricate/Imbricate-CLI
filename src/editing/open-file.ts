/**
 * @author WMXPY
 * @namespace Editing
 * @description Open File
 */

import { attemptMarkDir, directoryFiles, readTextFile, removeDirectory, removeFile, writeTextFile } from "@sudoo/io";
import { UUIDVersion1 } from "@sudoo/uuid";
import { IConfigurationManager } from "../configuration/interface";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { executeCommand } from "../util/execute-command";
import { fixImbricateTempDirectory } from "../util/fix-directory";
import { hashString } from "../util/hash";
import { readActiveEditing, writeActiveEditing } from "./controller";
import { ActiveEditing, SavingTarget } from "./definition";
import { cleanupSavingTarget, hashSavingTarget, performSavingTarget } from "./save-target";

const performEditing = async (
    filePath: string,
    content: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
) => {

    const tempPath: string = fixImbricateTempDirectory();
    await attemptMarkDir(tempPath);

    const command = configurationManager.getActiveEditCommand();

    terminalController.printInfo("Waiting For Change...");
    await openFileAndMonitor(command, filePath);

    const updatedContent: string = await readTextFile(filePath);

    const beforeChecksum: string = hashString(content);
    const afterChecksum: string = hashString(updatedContent);

    terminalController.printInfo(`<- #[${beforeChecksum}]`);
    terminalController.printInfo(`-> #[${afterChecksum}]`);

    if (beforeChecksum === afterChecksum) {

        terminalController.printInfo("No Change Detected...");
        await cleanupSavingTarget(savingTarget);
        terminalController.printInfo("Edit Cancelled");
    } else {

        terminalController.printInfo("Saving...");
        await performSavingTarget(savingTarget, updatedContent, globalManager);
        terminalController.printInfo("Edit Saved");
    }
};

export const openContentAndMonitor = async (
    content: string,
    fileName: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    configurationManager: IConfigurationManager,
): Promise<void> => {

    const activeEditing = await readActiveEditing();

    const savingTargetHash = hashSavingTarget(savingTarget);

    for (const editing of activeEditing) {
        if (editing.hash === savingTargetHash) {

            terminalController.printInfo(`Unsaved change found, started at ${editing.startedAt.toLocaleString()}`);
            terminalController.printInfo("Reopen Editing...");

            await performEditing(
                editing.path,
                content,
                savingTarget,
                globalManager,
                terminalController,
                configurationManager,
            );
            return;
        }
    }

    const editingIdentifier: string = UUIDVersion1.generateString();

    const tempFolderPath: string = fixImbricateTempDirectory();
    await attemptMarkDir(tempFolderPath);

    const outerTempFolderPath: string = fixImbricateTempDirectory(editingIdentifier);
    await attemptMarkDir(outerTempFolderPath);

    const tempFilePath: string = fixImbricateTempDirectory(editingIdentifier, fileName);

    const currentTime: Date = new Date();

    const updatedActiveEditing: ActiveEditing[] = [
        ...activeEditing,
        {
            identifier: editingIdentifier,
            hash: savingTargetHash,
            path: tempFilePath,
            startedAt: currentTime,
            target: savingTarget,
        },
    ];

    await writeActiveEditing(updatedActiveEditing);

    await writeTextFile(tempFilePath, content);

    await performEditing(
        tempFilePath,
        content,
        savingTarget,
        globalManager,
        terminalController,
        configurationManager,
    );

    await removeFile(tempFilePath);

    const remainingFiles: string[] = await directoryFiles(outerTempFolderPath);
    if (remainingFiles.length === 0) {
        await removeDirectory(outerTempFolderPath);
    }
};

export const openFileAndMonitor = async (command: string, path: string): Promise<string> => {

    const fixedCommand: string = command
        .replace("{path}", `"${path}"`);

    const output = await executeCommand(fixedCommand);

    return output;
};
