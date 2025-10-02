const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    // Rodar features (UI) e specs de API (JS)
    specPattern: [
      "cypress/projects/serverest/e2e/web/features/**/*.feature",
      "cypress/projects/serverest/e2e/api/**/*.cy.js",
    ],

    // Step definitions apenas para os .feature
    stepDefinitions: "cypress/projects/serverest/e2e/web/steps/**/*.js",

    supportFile: "cypress/support/e2e.js",

    // 👉 Sempre usar este baseUrl para os testes de UI
    baseUrl: "https://front.serverest.dev",

    // 👉 Usar este env nas chamadas de API: `${Cypress.env('apiUrl')}/login`
    env: {
      apiUrl: "https://serverest.dev",
    },

    fixturesFolder: "cypress/projects/serverest/resources",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },

    video: false,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    downloadsFolder: "cypress/downloads",

    excludeSpecPattern: [
      "**/node_modules/**",
      "**/__snapshots__/**",
      "**/__image_snapshots__/**",
    ],
  },
});
