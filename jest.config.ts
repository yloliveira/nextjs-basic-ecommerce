import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

export const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  setupFiles: ["<rootDir>/__mocks__/next.tsx"],
  coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/src/app/models"],
  collectCoverageFrom: [
    "<rootDir>/src/app/**/*.ts",
    "<rootDir>/src/app/**/*.tsx",
  ],
};

export default createJestConfig(config);
