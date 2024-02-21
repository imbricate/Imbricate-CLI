/**
 * @author WMXPY
 * @namespace Configuration
 * @description Raw Definition
 */

export type ListableValue<T> = T | T[];

export interface IRawImbricateConfiguration {

    readonly presets: ListableValue<string>;
}
