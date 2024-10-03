import { createServer } from "miragejs";
import init from "./miragejs";

describe("plugins/miragejs", () => {
  const env = process.env;

  it("should return the server only if the environment is development", () => {
    process.env = { ...env, NODE_ENV: "development" };
    const server = init();
    expect(server).not.toBeUndefined();
    expect(typeof server?.create).toBe("function");
    expect(typeof server?.createList).toBe("function");

    process.env = { ...env, NODE_ENV: "production" };
    expect(init()).toBeUndefined();

    process.env = { ...env, NODE_ENV: "test" };
    expect(init()).toBeUndefined();
  });
});
