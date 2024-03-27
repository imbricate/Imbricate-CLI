/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Collection
 */

import { attemptMarkDir, directoryFiles, isFolder, pathExists, writeTextFile } from "@sudoo/io";
import { CLICollectionFolderOccupied } from "../../cli/error/collection/collection-folder-occupied";
import { IImbricateOriginCollection, ImbricateOriginCollectionListPagesResponse } from "../../origin/collection/interface";
import { FileSystemCollectionMetadataCollection } from "./definition/collection";
import { FileSystemOriginPayload } from "./definition/origin";
import { executeCommand } from "./util/execute";
import { getCollectionFolderPath, joinCollectionFolderPath } from "./util/path-joiner";

export class FileSystemImbricateCollection implements IImbricateOriginCollection {

    public static withConfig(
        basePath: string,
        payloads: FileSystemOriginPayload,
        collection: FileSystemCollectionMetadataCollection,
    ): FileSystemImbricateCollection {

        return new FileSystemImbricateCollection(
            basePath,
            payloads,
            collection.collectionName,
            collection.description,
        );
    }

    private readonly _basePath: string;
    private readonly _payloads: FileSystemOriginPayload;

    private readonly _collectionName: string;
    private readonly _description?: string;

    private constructor(
        basePath: string,
        payload: FileSystemOriginPayload,
        collectionName: string,
        description?: string,
    ) {

        this._basePath = basePath;
        this._payloads = payload;

        this._collectionName = collectionName;
        this._description = description;
    }

    public get collectionName(): string {
        return this._collectionName;
    }
    public get description(): string | undefined {
        return this._description;
    }

    public async findScripts(...onActivities: string[]): Promise<void> {

        console.log(onActivities);

        throw new Error("Method not implemented.");
    }

    public async listPages(): Promise<ImbricateOriginCollectionListPagesResponse[]> {

        await this._ensureCollectionFolder();

        const collectionFolderPath = joinCollectionFolderPath(this._basePath, this._collectionName);

        const files: string[] = await directoryFiles(collectionFolderPath);

        return files
            .filter((file: string) => file.endsWith(".meta.json"))
            .filter((file: string) => !file.startsWith("."))
            .map((file: string) => {
                return file.slice(0, file.length - ".meta.json".length);
            })
            .map((file: string) => {
                return {
                    title: file,
                };
            });
    }

    public async createPage(title: string, open: boolean): Promise<void> {

        await this._ensureCollectionFolder();

        await this._putFileToCollectionFolder(
            this._fixFileName(title),
            "",
            open,
        );

        const currentTime: number = new Date().getTime();

        await this._putFileToCollectionFolder(
            this._fixMetaFileName(title),
            JSON.stringify({
                title,
                createdAt: currentTime,
                updatedAt: currentTime,
            }, null, 2),
            open,
        );
    }

    public async hasPage(title: string): Promise<boolean> {

        await this._ensureCollectionFolder();

        return await this._checkFileInCollectionFolder(title);
    }

    private async _ensureCollectionFolder(): Promise<void> {

        const collectionPath: string = getCollectionFolderPath(this._basePath);

        const collectionPathExistsResult: boolean = await pathExists(collectionPath);
        if (!collectionPathExistsResult) {
            await attemptMarkDir(collectionPath);
        }

        const collectionFolderPath = joinCollectionFolderPath(this._basePath, this._collectionName);

        const pathExistsResult: boolean = await pathExists(collectionFolderPath);
        if (!pathExistsResult) {
            await attemptMarkDir(collectionFolderPath);
            return;
        }

        const isDirectory: boolean = await isFolder(collectionFolderPath);
        if (!isDirectory) {
            throw CLICollectionFolderOccupied.withCollectionName(
                this._collectionName,
                collectionFolderPath,
            );
        }
    }

    private async _putFileToCollectionFolder(
        fileName: string,
        content: string,
        open: boolean,
    ): Promise<void> {

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            fileName,
        );

        await writeTextFile(targetFilePath, content);

        if (open) {
            await this._openEditor(targetFilePath);
        }
    }

    private async _checkFileInCollectionFolder(fileName: string): Promise<boolean> {

        const fixedFileName: string = this._fixFileName(fileName);

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            fixedFileName,
        );

        const fileExists = await pathExists(targetFilePath);

        return fileExists;
    }

    private async _openEditor(path: string): Promise<string> {

        const command: string = this._payloads.startEditorCommand
            .replace("{path}", `"${path}"`);

        const output = await executeCommand(command);

        return output;
    }

    private _fixMetaFileName(fileName: string): string {

        let fixedFileName: string = fileName.trim();

        const metaJSONExtension: string = ".meta.json";

        if (!fixedFileName.endsWith(metaJSONExtension)) {
            fixedFileName = `${fixedFileName}${metaJSONExtension}`;
        }

        return fixedFileName;
    }

    private _fixFileName(fileName: string): string {

        let fixedFileName: string = fileName.trim();

        const markDownExtension: string = ".md";

        if (!fixedFileName.endsWith(markDownExtension)) {
            fixedFileName = `${fixedFileName}${markDownExtension}`;
        }

        return fixedFileName;
    }
}
