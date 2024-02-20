/**
 * @author WMXPY
 * @namespace Configuration
 * @description Initialize
 */

import { RuleManager } from "../rule/manager";
import { ImbricateConfiguration } from "./definition";

export const initializeConfiguration = async (
    configuration: ImbricateConfiguration,
): Promise<RuleManager> => {

    const ruleManager = RuleManager.fromScratch();

    configuration.presets;

    return ruleManager;
};
