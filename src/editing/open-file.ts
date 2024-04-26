/**
 * @author WMXPY
 * @namespace Editing
 * @description Open File
 */

import { cleanupImbricateSavingTarget, hashImbricateSavingTarget, performImbricateSavingTarget, readActiveEditing, writeActiveEditing } from "@imbricate/local-fundamental";
import { attemptMarkDir, readTextFile, writeTextFile } from "@sudoo/io";
import { UUIDVersion1 } from "@sudoo/uuid";
import { ConfigurationProfileManager } from "../configuration/profile/profile-manager";
import { CLIAlreadyEditing } from "../error/editing/already-editing";
import { GlobalManager } from "../global/global-manager";
import { ITerminalController } from "../terminal/definition";
import { executeCommand } from "../util/execute-command";
import { fixImbricateTempDirectory } from "../util/fix-directory";
import { hashString } from "../util/hash";
import { ActiveEditing, SavingTarget } from "./definition";
import { diffSavingTarget } from "./diff-file";
import { getActiveEditingReference } from "./reference";

const performEditing = async (
    filePath: string,
    content: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    profile: ConfigurationProfileManager,
    handsFree: boolean,
) => {

    const tempFolderPath: string = fixImbricateTempDirectory();
    await attemptMarkDir(tempFolderPath);

    if (handsFree) {

        const commands = profile.getActiveHandsFreeEditCommand();
        openFileAndMonitor(commands, filePath, terminalController);

        terminalController.printInfo(`File Opened: ${filePath}`);

        return;
    }

    const commands = profile.getActiveEditCommand();

    terminalController.printInfo("Waiting For Change...");
    await openFileAndMonitor(commands, filePath, terminalController);

    await performSaveAndCleanup(
        filePath,
        content,
        savingTarget,
        globalManager,
        terminalController,
    );
};

export const performSaveAndCleanup = async (
    filePath: string,
    content: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
) => {

    const updatedContent: string = await readTextFile(filePath);

    const beforeChecksum: string = hashString(content);
    const afterChecksum: string = hashString(updatedContent);

    terminalController.printInfo(`<- #[${beforeChecksum}]`);
    terminalController.printInfo(`-> #[${afterChecksum}]`);

    if (beforeChecksum === afterChecksum) {

        terminalController.printInfo("No Change Detected...");
        await cleanupImbricateSavingTarget(savingTarget);
        terminalController.printInfo("Edit Cancelled");
    } else {

        terminalController.printInfo("Saving...");
        await performImbricateSavingTarget(savingTarget, updatedContent, globalManager.originManager);
        terminalController.printInfo("Edit Saved");
    }
};

export const openContentAndDiff = async (
    content: string,
    fileName: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    profile: ConfigurationProfileManager,
): Promise<void> => {

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash: string = hashImbricateSavingTarget(savingTarget);

    for (const editing of activeEditing) {
        if (editing.hash === savingTargetHash) {

            throw CLIAlreadyEditing.withSavingTarget(savingTarget);
        }
    }

    const editingIdentifier: string = UUIDVersion1.generateString();

    const tempFolderPath: string = fixImbricateTempDirectory();
    await attemptMarkDir(tempFolderPath);

    const outerTempFolderPath: string = fixImbricateTempDirectory(editingIdentifier);
    await attemptMarkDir(outerTempFolderPath);

    const tempFilePath: string = fixImbricateTempDirectory(editingIdentifier, fileName);

    const currentTime: Date = new Date();

    const newActiveEditing: ActiveEditing = {
        identifier: editingIdentifier,
        hash: savingTargetHash,
        path: tempFilePath,
        startedAt: currentTime,
        target: savingTarget,
    };

    const updatedActiveEditing: ActiveEditing[] = [
        ...activeEditing,
        newActiveEditing,
    ];

    const reference: string = getActiveEditingReference(newActiveEditing);

    terminalController.printInfo("Editing Started...");
    terminalController.printInfo([
        `${savingTarget.type} - ${reference}`,
        `|> ${newActiveEditing.identifier}`,
        `|- ${tempFilePath}`,
    ].join("\n"));

    await writeActiveEditing(updatedActiveEditing);

    await writeTextFile(tempFilePath, content);

    await diffSavingTarget(
        tempFilePath,
        savingTarget,
        globalManager,
        profile,
        terminalController,
    );
};

export const openContentAndMonitor = async (
    content: string,
    fileName: string,
    savingTarget: SavingTarget<any>,
    globalManager: GlobalManager,
    terminalController: ITerminalController,
    profile: ConfigurationProfileManager,
    handsFree: boolean,
): Promise<void> => {

    let fixedHandFree: boolean = handsFree;

    if (profile.getActiveEditCommand() === profile.getActiveHandsFreeEditCommand()) {

        fixedHandFree = true;
        terminalController.printInfo("Automatically Switched to Hands Free Mode due to duplicated editing and hands free editing command configured");
    }

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash: string = hashImbricateSavingTarget(savingTarget);

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
                profile,
                fixedHandFree,
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
        profile,
        fixedHandFree,
    );
};

export const openFileAndMonitor = async (
    commands: string[],
    path: string,
    terminalController: ITerminalController,
): Promise<void> => {

    const fixedCommands: string[] = commands
        .map((command: string) => {
            return command.replace("{path}", `${path}`);
        });

    await executeCommand(fixedCommands, terminalController);
    return;
};
