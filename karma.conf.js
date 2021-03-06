const { join } = require("path");

module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
        "src/**/*.ts"
    ],
    preprocessors: {
        "**/*.ts": "karma-typescript"
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ['ChromeNoSandbox'],
  
      // you can define custom flags
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /.*\/__tests__\/.*test_.*\.ts$/,
      },
      tsconfig: "./tsconfig.json"
    },
    mime: {
      'text/x-typescript': ['ts']
    }
  });
};