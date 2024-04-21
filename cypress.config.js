const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 300_000,
  pageLoadTimeout: 300_000,
  responseTimeout: 300_000,
  requestTimeout: 300_000,

  e2e: {
    baseUrl: "https://www.forbes.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
