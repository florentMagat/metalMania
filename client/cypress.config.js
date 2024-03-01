const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '333hm2',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
