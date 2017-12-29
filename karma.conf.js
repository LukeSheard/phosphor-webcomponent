const { join } = require("path");

module.exports = function(config) {
  config.set({
      frameworks: [
        "jasmine",
      ],
      files: [
        "packages/*/src/**/test_*.ts"
      ],
      preprocessors: {
          "**/*.ts": ['webpack']
      },
      mime: {
        'text/x-typescript': ['ts','tsx']
      },
      reporters: ["progress"],
      browsers: ["Chrome"],
      webpack: {
        devtool: 'inline-source-map',
        module: {
          rules: [
            {
              loader: "ts-loader",
              test: /.tsx?$/
            },
            {
              test: /\.(scss|css)$/,
              use: [
                "style-loader",
                "css-loader",
                "sass-loader"
              ]
              
            }
          ]
        },
        resolve: {
          alias: {
            "phosphor-dock-layout": join(__dirname, "packages", "dock-layout", "src"),
            "phosphor-layout-shared": join(__dirname, "packages", "shared", "src"),
            "phosphor-tab-layout": join(__dirname, "packages", "tab-layout", "src")
          },
          extensions: [".ts", ".js", ".css", ".scss"]
        }
      }
  });
};