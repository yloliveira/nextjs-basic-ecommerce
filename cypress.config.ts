import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "index.json",
    quiet: true,
    html: false,
    json: true,
  },
});
