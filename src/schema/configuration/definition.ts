/**
 * @author WMXPY
 * @namespace Schema_Configuration
 * @description Definition
 */

export type ListableValue<T> = T | T[];

export type RawImbricateConfiguration = {

    readonly presets: ListableValue<string>;
};

export type ImbricateConfiguration = {

    readonly presets: string[];
} & RawImbricateConfiguration;
