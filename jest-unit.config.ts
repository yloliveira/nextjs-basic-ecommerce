import type { Config } from "jest";
import nextJest from "next/jest";
import { config as defaultConfig } from "./jest.config";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  ...defaultConfig,
  testMatch: ["**/?(*.unit.)+(spec|test).[tt]s?(x)"],
};

module.exports = createJestConfig(config);
