import { Configuration } from "webpack";

const config: Configuration = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: [
    // node_modules
    // "document-register-element",
    "@phosphor/widgets/style/index.css",

    // web components
    "../packages/shared/src",
    "../packages/dock-layout/src",
    "../packages/tab-layout/src",

    // custom style
    "./style.css",
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /.tsx?$/
      },
      {
        use: [
          "style-loader",
          "css-loader"
        ],
        test: /.css?$/
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
  },
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ]
  }
}

export default config;