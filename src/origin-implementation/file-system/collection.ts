/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Collection
 */

import { attemptMarkDir, isFolder, pathExists, writeTextFile } from "@sudoo/io";
import { IImbricateOriginCollection } from "../../origin/collection/interface";
import { FileSystemCollectionMetadataCollection } from "./definition/collection";
import { getCollectionFolderPath, joinCollectionFolderPath } from "./util/path-joiner";
import { CLICollectionFolderOccupied } from "../../cli/error/collection/collection-folder-occupied";

export class FileSystemImbricateCollection implements IImbricateOriginCollection {

    public static withConfig(
        basePath: string,
        collection: FileSystemCollectionMetadataCollection,
    ): FileSystemImbricateCollection {

        return new FileSystemImbricateCollection(
            basePath,
            collection.collectionName,
            collection.description,
        );
    }

    private readonly _basePath: string;

    private readonly _collectionName: string;
    private readonly _description?: string;

    private constructor(
        basePath: string,
        collectionName: string,
        description?: string,
    ) {

        this._basePath = basePath;

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

    public async createPage(title: string): Promise<void> {

        await this._ensureCollectionFolder();

        await this._putFileToCollectionFolder(
            title,
            "",
        );
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
    ): Promise<void> {

        let fixedFileName: string = fileName.trim();

        const markDownExtension: string = ".md";

        if (!fixedFileName.endsWith(markDownExtension)) {
            fixedFileName = `${fixedFileName}${markDownExtension}`;
        }

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            fixedFileName,
        );

        await writeTextFile(targetFilePath, content);
    }
}
