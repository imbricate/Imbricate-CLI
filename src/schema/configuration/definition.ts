/**
 * @author WMXPY
 * @namespace Schema_Configuration
 * @description Definition
 */

export type ListableValue<T> = T | T[];

export type ImbricateConfiguration = {

    readonly presets: ListableValue<string>;
};

export type ParsedImbricateConfiguration = {

    readonly presets: string[];
} & ImbricateConfiguration;
