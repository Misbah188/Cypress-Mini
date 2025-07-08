const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    watchforFileChanges: false,
    defaultCommandTimeout:60000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
