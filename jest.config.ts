import type { Config } from "jest";

export default async (): Promise<Config> => {
    return {
        verbose: true,
        transformIgnorePatterns: [
            "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)",
        ],
        collectCoverageFrom: [
            "src/**/*.ts",
        ],
        coverageReporters: [
            "json",
            "text-summary",
        ],
    };
};
