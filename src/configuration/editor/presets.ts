/**
 * @author WMXPY
 * @namespace Configuration_Editor
 * @description Presets
 */

export type ConfigurationEditorPreset = {

    readonly editCommand: string;
    readonly editHandsFreeCommand: string;
    readonly diffCommand: string;
};

export const configurationEditorEchoPreset: ConfigurationEditorPreset = {

    editCommand: 'echo "{path}"',
    editHandsFreeCommand: 'echo "{path}"',
    diffCommand: 'echo "{path1}" "{path2}"',
};

export const configurationEditorVscodeNewWindowPreset: ConfigurationEditorPreset = {

    editCommand: 'code "{path}" --wait --new-window',
    editHandsFreeCommand: 'code "{path}" --new-window',
    diffCommand: 'code --diff "{path1}" "{path2}" --new-window',
};

export const configurationEditorPresets: Record<string, ConfigurationEditorPreset> = {

    "echo": configurationEditorEchoPreset,
    "vscode": {
        editCommand: 'code "{path}" --wait',
        editHandsFreeCommand: 'code "{path}"',
        diffCommand: 'code --diff "{path1}" "{path2}"',
    },
    "vscode-new-window": configurationEditorVscodeNewWindowPreset,
    "vscodium": {
        editCommand: 'codium "{path}" --wait',
        editHandsFreeCommand: 'codium "{path}"',
        diffCommand: 'codium --diff "{path1}" "{path2}"',
    },
    "vscodium-new-window": {
        editCommand: 'codium "{path}" --wait --new-window',
        editHandsFreeCommand: 'codium "{path}" --new-window',
        diffCommand: 'codium --diff "{path1}" "{path2}" --new-window',
    },
    "vscode-insight": {
        editCommand: 'code-insiders "{path}" --wait',
        editHandsFreeCommand: 'code-insiders "{path}"',
        diffCommand: 'code-insiders --diff "{path1}" "{path2}"',
    },
    "vscode-insight-new-window": {
        editCommand: 'code-insiders "{path}" --wait --new-window',
        editHandsFreeCommand: 'code-insiders "{path}" --new-window',
        diffCommand: 'code-insiders --diff "{path1}" "{path2}" --new-window',
    },
    "sublime": {
        editCommand: 'subl "{path}"',
        editHandsFreeCommand: 'subl "{path}"',
        diffCommand: 'subl --command "side_by_side_diff" "{path1}" "{path2}"',
    },
    "atom": {
        editCommand: 'atom "{path}"',
        editHandsFreeCommand: 'atom "{path}"',
        diffCommand: 'atom --diff "{path1}" "{path2}"',
    },
    "notepad": {
        editCommand: 'notepad "{path}"',
        editHandsFreeCommand: 'notepad "{path}"',
        diffCommand: 'notepad "{path1}" "{path2}"',
    },
    "start": {
        editCommand: 'start "{path}"',
        editHandsFreeCommand: 'start "{path}"',
        diffCommand: 'start "{path1}" "{path2}"',
    },
    "open": {
        editCommand: 'open "{path}"',
        editHandsFreeCommand: 'open "{path}"',
        diffCommand: 'open "{path1}" "{path2}"',
    },
};
