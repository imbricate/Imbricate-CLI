/**
 * @author WMXPY
 * @namespace Configuration_Editor
 * @description Presets
 */

export type ConfigurationEditorPreset = {

    readonly editCommand: string[];
    readonly editHandsFreeCommand: string[];
    readonly diffCommand: string[];
};

export const configurationEditorEchoPreset: ConfigurationEditorPreset = {

    editCommand: ["echo", "{path}"],
    editHandsFreeCommand: ["echo", "{path}"],
    diffCommand: ["echo", "{path1}", "{path2}"],
};

const buildVSCodeLikePreset = (
    command: string,
    newWindow: boolean,
): ConfigurationEditorPreset => {

    const editCommand: string[] = [command, "{path}", "--wait"];
    const editHandsFreeCommand: string[] = [command, "{path}"];
    const diffCommand: string[] = [command, "--diff", "{path1}", "{path2}"];

    if (newWindow) {
        editCommand.push("--new-window");
        editHandsFreeCommand.push("--new-window");
        diffCommand.push("--new-window");
    }

    return {
        editCommand,
        editHandsFreeCommand,
        diffCommand,
    };
};

export const configurationEditorVscodeNewWindowPreset: ConfigurationEditorPreset =
    buildVSCodeLikePreset("code", true);

export const configurationEditorPresets: Record<string, ConfigurationEditorPreset> = {

    "echo": configurationEditorEchoPreset,
    "vscode": buildVSCodeLikePreset("code", false),
    "vscode-new-window": configurationEditorVscodeNewWindowPreset,
    "vscodium": buildVSCodeLikePreset("codium", false),
    "vscodium-new-window": buildVSCodeLikePreset("codium", true),
    "vscode-insight": buildVSCodeLikePreset("code-insiders", false),
    "vscode-insight-new-window": buildVSCodeLikePreset("code-insiders", true),
    "sublime": {
        editCommand: ["subl", "{path}"],
        editHandsFreeCommand: ["subl", "{path}"],
        diffCommand: ["subl", "--command", "side_by_side_diff", "{path1}", "{path2}"],
    },
    "atom": {
        editCommand: ["atom", "{path}"],
        editHandsFreeCommand: ["atom", "{path}"],
        diffCommand: ["atom", "--diff", "{path1}", "{path2}"],
    },
    "notepad": {
        editCommand: ["start", "''", "/B", "notepad", "{path}"],
        editHandsFreeCommand: ["start", "''", "/B", "notepad", "{path}"],
        diffCommand: ["start", "''", "/B", "notepad", "{path1}"],
    },
    "start": {
        editCommand: ["start", "{path}"],
        editHandsFreeCommand: ["start", "{path}"],
        diffCommand: ["start", "{path1}", "{path2}"],
    },
    "open": {
        editCommand: ["open", "{path}"],
        editHandsFreeCommand: ["open", "{path}"],
        diffCommand: ["open", "{path1}", "{path2}"],
    },
};
