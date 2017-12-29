const { join } = require("path");

module.exports = function(config) {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: [
        "packages/*/src/**/*.ts"
    ],
    preprocessors: {
        "**/*.ts": "karma-typescript"
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["Chrome"],
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