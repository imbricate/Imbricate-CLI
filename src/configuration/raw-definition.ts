/**
 * @author WMXPY
 * @namespace Configuration
 * @description Raw Definition
 */

export interface IImbricateConfigurationOrigin {

}

export type ListableValue<T> = T | T[];

export interface IRawImbricateConfiguration {

    readonly origins: ListableValue<IImbricateConfigurationOrigin>;
}
