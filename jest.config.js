const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  setupFiles: ["<rootDir>/__mocks__/next.tsx"],
  collectCoverageFrom: ["<rootDir>/src/app/components/**/*.tsx"]
};

module.exports = createJestConfig(config);
