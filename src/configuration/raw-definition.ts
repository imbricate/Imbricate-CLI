/**
 * @author WMXPY
 * @namespace Configuration
 * @description Raw Definition
 */

export type ListableValue<T> = T | T[];

export type RawImbricateConfiguration = {

    readonly presets: ListableValue<string>;
};
