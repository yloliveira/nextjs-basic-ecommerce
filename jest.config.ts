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
  collectCoverageFrom: ["<rootDir>/src/app/components/**/*.tsx"],
};

export default createJestConfig(config);
