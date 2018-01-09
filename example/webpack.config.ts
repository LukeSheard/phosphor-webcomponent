import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { join } from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  context: __dirname,
  devServer: {
    contentBase: join(__dirname, "public")
  },
  devtool: "source-map",
  entry: [
    // node_modules
    "document-register-element",

    "phosphor-dock-layout",
    "phosphor-split-layout",
    "phosphor-tab-layout"
  ],
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /.tsx?$/
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            "sass-loader"
          ]
        })
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: join(__dirname, "public")
  },
  plugins: [new ExtractTextPlugin(`[name].css`)],
  resolve: {
    alias: {
      "phosphor-dock-layout": join(__dirname, "..", "packages", "dock-layout", "src"),
      "phosphor-layout-shared": join(__dirname, "..", "packages", "shared", "src"),
      "phosphor-split-layout": join(__dirname, "..", "packages", "split-layout", "src"),
      "phosphor-tab-layout": join(__dirname, "..", "packages", "tab-layout", "src")
    },
    extensions: [".ts", ".js", ".css", ".scss"]
  }
};

export default config;
