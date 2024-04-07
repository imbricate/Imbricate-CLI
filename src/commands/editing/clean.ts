/**
 * @author WMXPY
 * @namespace Commands_Editing
 * @description Clean
 */

import { directoryFiles, isFolder, removeDirectory, removeFile } from "@sudoo/io";
import { Command } from "commander";
import { IConfigurationManager } from "../../configuration/interface";
import { readActiveEditing } from "../../editing/controller";
import { ActiveEditing } from "../../editing/definition";
import { readEditingDraftFolders, resolveDraftFolderPath } from "../../editing/draft";
import { CLIEditingTooManyFiles } from "../../error/editing/too-many-files";
import { GlobalManager } from "../../global/global-manager";
import { ITerminalController } from "../../terminal/definition";
import { createActionRunner } from "../../util/action-runner";
import { createConfiguredCommand } from "../../util/command";
import { resolvePath } from "../../util/resolve-path";

type EditingCleanCommandOptions = {

    readonly quiet?: boolean;
    readonly dryRun?: boolean;
};

export const createEditingCleanCommand = (
    _globalManager: GlobalManager,
    terminalController: ITerminalController,
    _configurationManager: IConfigurationManager,
): Command => {

    const cleanCommand: Command = createConfiguredCommand("clean");

    cleanCommand
        .description("clean up inactive editing drafts")
        .option("-q, --quiet", "quite mode")
        .option("-d, --dry-run", "dry run mode")
        .action(createActionRunner(terminalController, async (
            options: EditingCleanCommandOptions,
        ): Promise<void> => {

            const activeEditing: ActiveEditing[] = await readActiveEditing();

            const draftFolders: string[] = await readEditingDraftFolders();

            const outcastFolders: string[] = draftFolders.filter((draftFolder: string) => {
                return !activeEditing.some((active: ActiveEditing) => {
                    return active.identifier === draftFolder;
                });
            });

            if (outcastFolders.length === 0) {

                if (!options.quiet) {
                    terminalController.printInfo("No Drafts to Clean");
                }
                return;
            }

            folder: for (const outcastFolder of outcastFolders) {

                const outcastPath: string = resolveDraftFolderPath(outcastFolder);

                const isDirectory: boolean = await isFolder(outcastPath);

                if (!isDirectory) {

                    if (!options.quiet) {
                        terminalController.printInfo(`Editing Draft [${outcastFolder}] is not a directory, skipped`);
                    }
                    continue folder;
                }

                const directoryFileList: string[] = await directoryFiles(outcastPath);

                if (directoryFileList.length > 1) {

                    if (!options.quiet) {
                        terminalController.printInfo(`Editing Draft [${outcastFolder}] has too many files, delete failed`);
                    }

                    throw CLIEditingTooManyFiles.create(outcastFolder, directoryFileList);
                }

                if (options.dryRun) {

                    if (!options.quiet) {
                        terminalController.printInfo(`Draft folder [${outcastFolder}] will be deleted`);
                    }
                    continue folder;
                }

                for (const directoryFile of directoryFileList) {

                    const resolvedFilePath: string = resolvePath(outcastPath, directoryFile);

                    if (!options.quiet) {
                        terminalController.printInfo(`Draft file [${outcastFolder}/${directoryFile}] deleted`);
                    }
                    await removeFile(resolvedFilePath);
                }

                await removeDirectory(outcastPath);

                if (!options.quiet) {
                    terminalController.printInfo(`Draft folder [${outcastFolder}] deleted`);
                }
            }
        }));

    return cleanCommand;
};
