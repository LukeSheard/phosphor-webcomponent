import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import { join } from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  context: __dirname,
  devtool: "source-map",
  entry: [
    // node_modules
    "document-register-element",

    // web components
    "phosphor-layout-shared/dist/shared.css",

    "phosphor-layout-dock/src", // hack to access typescript in dev
    
    "phosphor-layout-tab/src", // hack to access typescript in dev
  ],
  output: {
    path: __dirname,
    filename: "[name].js"
  },
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
  devServer: {
    contentBase: join(__dirname, "src")
  },
  plugins: [
    new ExtractTextPlugin(`[name].css`),
  ],
  resolve: {
    extensions: [
      ".ts",
      ".js",
      ".css",
      ".scss"
    ]
  }
}

export default config;