const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    specPattern: 'cypress/e2e/**/*.{feature,feature.ts}',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config, {
        stepDefinitions: [
          'cypress/e2e/**/*.steps.{js,ts}',
          'cypress/e2e/**/*.{js,ts}',
          'cypress/support/step_definitions/**/*.{js,ts}',
        ],
      });
      on('file:preprocessor', createBundler({
        plugins: [require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin(config)],
      }));
      
      require('cypress-mochawesome-reporter/plugin')(on);
      
      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss',
    },
  },
});

