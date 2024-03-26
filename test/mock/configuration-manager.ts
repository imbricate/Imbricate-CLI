/**
 * @author WMXPY
 * @namespace CLI
 * @description Configuration Manager
 * @override Mock
 */

export class MockConfigurationManager {

    public static create(): MockConfigurationManager {

        return new MockConfigurationManager();
    }

    private constructor() {

    }
}
