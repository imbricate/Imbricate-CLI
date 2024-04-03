import { attemptMarkDir, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import { fixImbricateTempDirectory, fixImbricateHomeDirectory } from "../util/fix-directory";
import { ActiveEditing } from "./definition";

export const readActiveEditing = async (): Promise<ActiveEditing[]> => {

    const tempEditingConfigPath: string = fixImbricateHomeDirectory("active-editings.json");
    const fileExist: boolean = await pathExists(tempEditingConfigPath);

    if (!fileExist) {
        return [];
    }
    const editingFileContent = await readTextFile(tempEditingConfigPath);
    const parsed: ActiveEditing[] = JSON.parse(editingFileContent);

    return parsed.map((item: ActiveEditing) => {
        return {
            ...item,
            startedAt: new Date(item.startedAt),
        };
    });
};

export const writeActiveEditings = async (newValue: ActiveEditing[]) => {

    const tempEditingConfigPath: string = fixImbricateHomeDirectory("active-editings.json");
    await writeTextFile(tempEditingConfigPath, JSON.stringify(
        newValue.map((item: ActiveEditing) => {
            return {
                ...item,
                startedAt: item.startedAt.getTime(),
            };
        }), null, 2,
    ));
};
