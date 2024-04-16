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

const getPathPlaceholder = (order?: number): string => {

    if (typeof order === "number") {
        return `"path${order}"`;
    }

    return '"{path}"';
};

const buildVSCodeLikePreset = (
    command: string,
    newWindow: boolean,
): ConfigurationEditorPreset => {

    const editCommand: string[] = [command, getPathPlaceholder(), "--wait"];
    const editHandsFreeCommand: string[] = [command, getPathPlaceholder()];
    const diffCommand: string[] = [command, "--diff", getPathPlaceholder(1), getPathPlaceholder(2)];

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

const buildSublimeLikePreset = (
    command: string,
    newWindow: boolean,
): ConfigurationEditorPreset => {

    const editCommand: string[] = [command, "--wait", getPathPlaceholder()];
    const editHandsFreeCommand: string[] = [command, getPathPlaceholder()];
    const diffCommand: string[] = [command, "--command", "side_by_side_diff", getPathPlaceholder(1), getPathPlaceholder(2)];

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

export const configurationEditorEchoPreset: ConfigurationEditorPreset = {

    editCommand: ["echo", getPathPlaceholder()],
    editHandsFreeCommand: ["echo", getPathPlaceholder()],
    diffCommand: ["echo", getPathPlaceholder(1), getPathPlaceholder(2)],
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
    "sublime": buildSublimeLikePreset("subl", false),
    "sublime-new-window": buildSublimeLikePreset("subl", true),
    "vim": {
        editCommand: ["vim", getPathPlaceholder()],
        editHandsFreeCommand: ["vim", getPathPlaceholder()],
        diffCommand: ["vim", "--d", getPathPlaceholder(1), getPathPlaceholder(2)],
    },
    "nano": {
        editCommand: ["nano", getPathPlaceholder()],
        editHandsFreeCommand: ["nano", getPathPlaceholder()],
        diffCommand: ["diff", getPathPlaceholder(1), getPathPlaceholder(2)],
    },
    "atom": {
        editCommand: ["atom", getPathPlaceholder()],
        editHandsFreeCommand: ["atom", getPathPlaceholder()],
        diffCommand: ["atom", "--diff", getPathPlaceholder(1), getPathPlaceholder(2)],
    },
    "notepad": {
        editCommand: ["start", "notepad", getPathPlaceholder()],
        editHandsFreeCommand: ["start", "notepad", getPathPlaceholder()],
        diffCommand: ["start", "notepad", getPathPlaceholder(1), getPathPlaceholder(2)],
    },
    "start": {
        editCommand: ["start", getPathPlaceholder()],
        editHandsFreeCommand: ["start", getPathPlaceholder()],
        diffCommand: ["start", getPathPlaceholder(1), getPathPlaceholder(2)],
    },
    "open": {
        editCommand: ["open", getPathPlaceholder()],
        editHandsFreeCommand: ["open", getPathPlaceholder()],
        diffCommand: ["open", getPathPlaceholder(1), getPathPlaceholder(2)],
    },
};
