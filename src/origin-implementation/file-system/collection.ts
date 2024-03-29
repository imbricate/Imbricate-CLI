/**
 * @author WMXPY
 * @namespace FileSystem
 * @description Collection
 */

import { attemptMarkDir, directoryFiles, isFolder, pathExists, readTextFile, removeFile, writeTextFile } from "@sudoo/io";
import { UUIDVersion1 } from "@sudoo/uuid";
import { CLICollectionFolderOccupied } from "../../cli/error/collection/collection-folder-occupied";
import { IImbricateOriginCollection, ImbricateOriginCollectionListPagesResponse } from "../../origin/collection/interface";
import { IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE, IMBRICATE_SEARCH_SNIPPET_TYPE, ImbricateSearchSnippet } from "../../search/snippet";
import { FileSystemCollectionMetadataCollection } from "./definition/collection";
import { FileSystemOriginPayload } from "./definition/origin";
import { executeCommand } from "./util/execute";
import { getCollectionFolderPath, joinCollectionFolderPath } from "./util/path-joiner";

const metadataFolderName: string = ".metadata";

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

        const collectionFolderPath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            metadataFolderName,
        );

        const files: string[] = await directoryFiles(collectionFolderPath);

        return files
            .filter((file: string) => file.endsWith(".meta.json"))
            .filter((file: string) => !file.startsWith("."))
            .map((file: string) => {
                return file.slice(0, file.length - ".meta.json".length);
            })
            .map((file: string) => {

                const uuid: string = file.split(".").pop() as string;
                const title: string = file.slice(0, file.length - uuid.length - 1);

                return {
                    identifier: uuid,
                    title,
                };
            });
    }

    public async createPage(
        title: string,
        initialContent: string = "",
    ): Promise<ImbricateOriginCollectionListPagesResponse> {

        await this._ensureCollectionFolder();
        const uuid: string = UUIDVersion1.generateString();

        await this._putFileToCollectionFolder(
            this._fixFileNameFromIdentifier(uuid),
            initialContent,
        );

        const currentTime: number = new Date().getTime();

        await this._putFileToCollectionMetaFolder(
            this._fixMetaFileName(title, uuid),
            JSON.stringify({
                title,
                identifier: uuid,
                createdAt: currentTime,
                updatedAt: currentTime,
            }, null, 2),
        );

        return {
            title,
            identifier: uuid,
        };
    }

    public async deletePage(identifier: string, title: string): Promise<void> {

        await this._ensureCollectionFolder();

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            this._fixFileNameFromIdentifier(identifier),
        );

        const metaFileName: string = this._fixMetaFileName(title, identifier);

        const metaFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            metadataFolderName,
            metaFileName,
        );

        await removeFile(targetFilePath);
        await removeFile(metaFilePath);
    }

    public async openPage(identifier: string): Promise<void> {

        await this._ensureCollectionFolder();

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            this._fixFileNameFromIdentifier(identifier),
        );

        await this._openEditor(targetFilePath);
    }

    public async readPage(identifier: string): Promise<string> {

        await this._ensureCollectionFolder();

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            this._fixFileNameFromIdentifier(identifier),
        );

        return await readTextFile(targetFilePath);
    }

    public async hasPage(title: string): Promise<boolean> {

        const pages: ImbricateOriginCollectionListPagesResponse[] = await this.listPages();

        return pages.some((page: ImbricateOriginCollectionListPagesResponse) => {
            return page.title === title;
        });
    }

    public async searchPages(
        keyword: string,
    ): Promise<Array<ImbricateSearchSnippet<IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE>>> {

        const pages: ImbricateOriginCollectionListPagesResponse[] = await this.listPages();

        const snippets: Array<ImbricateSearchSnippet<IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE>> = [];

        for (const page of pages) {

            const titleIndex: number = page.title.search(new RegExp(keyword, "i"));

            if (titleIndex !== -1) {

                snippets.push({
                    type: IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE,

                    scope: this._collectionName,
                    identifier: page.identifier,
                    headline: page.title,

                    source: IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE.TITLE,
                    snippet: page.title,
                });
            }

            const content: string = await this._getPageContent(page.identifier);

            const regexIndex: number = content.search(new RegExp(keyword, "i"));

            if (regexIndex === -1) {
                continue;
            }

            const snippetAroundKeyword: string = content.slice(
                Math.max(0, regexIndex - 10),
                Math.min(content.length, regexIndex + keyword.length + 10),
            );

            snippets.push({
                type: IMBRICATE_SEARCH_SNIPPET_TYPE.PAGE,

                scope: this._collectionName,
                identifier: page.identifier,
                headline: page.title,

                source: IMBRICATE_SEARCH_SNIPPET_PAGE_SNIPPET_SOURCE.CONTENT,
                snippet: snippetAroundKeyword,
            });
        }

        return snippets;
    }

    private async _getPageContent(identifier: string): Promise<string> {

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            this._fixFileNameFromIdentifier(identifier),
        );

        return await readTextFile(targetFilePath);
    }

    private async _ensureCollectionFolder(): Promise<void> {

        const collectionPath: string = getCollectionFolderPath(this._basePath);

        const collectionPathExistsResult: boolean = await pathExists(collectionPath);
        if (!collectionPathExistsResult) {
            await attemptMarkDir(collectionPath);
        }

        const collectionFolderPath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
        );

        const pathExistsResult: boolean = await pathExists(collectionFolderPath);
        if (!pathExistsResult) {
            await attemptMarkDir(collectionFolderPath);
        }

        const metaFolderPath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            metadataFolderName,
        );

        const metaPathExistsResult: boolean = await pathExists(metaFolderPath);
        if (!metaPathExistsResult) {
            await attemptMarkDir(metaFolderPath);
        }

        const isDirectory: boolean = await isFolder(collectionFolderPath);
        if (!isDirectory) {
            throw CLICollectionFolderOccupied.withCollectionName(
                this._collectionName,
                collectionFolderPath,
            );
        }

        const isMetaDirectory: boolean = await isFolder(metaFolderPath);
        if (!isMetaDirectory) {
            throw CLICollectionFolderOccupied.withCollectionName(
                this._collectionName,
                metaFolderPath,
            );
        }
    }

    private async _putFileToCollectionFolder(
        identifier: string,
        content: string,
    ): Promise<void> {

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            identifier,
        );

        await writeTextFile(targetFilePath, content);
    }

    private async _putFileToCollectionMetaFolder(
        fileName: string,
        content: string,
    ): Promise<void> {

        const targetFilePath = joinCollectionFolderPath(
            this._basePath,
            this._collectionName,
            metadataFolderName,
            fileName,
        );

        await writeTextFile(targetFilePath, content);
    }

    private async _openEditor(path: string): Promise<string> {

        const command: string = this._payloads.startEditorCommand
            .replace("{path}", `"${path}"`);

        const output = await executeCommand(command);

        return output;
    }

    private _fixMetaFileName(fileName: string, uuid: string): string {

        let fixedFileName: string = fileName.trim();

        const metaJSONExtension: string = ".meta.json";

        if (!fixedFileName.endsWith(metaJSONExtension)) {
            fixedFileName = `${fixedFileName}.${uuid}${metaJSONExtension}`;
        }

        return fixedFileName;
    }

    private _fixFileNameFromIdentifier(identifier: string): string {

        const markDownExtension: string = ".md";

        return `${identifier}${markDownExtension}`;
    }
}
