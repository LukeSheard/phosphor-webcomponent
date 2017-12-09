import { Configuration } from "webpack";

const config: Configuration = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: [
    "document-register-element",
    "@phosphor/widgets/style/index.css",
    "./style.css",
    "@phosphorwc/widget/src",
    "@phosphorwc/dock-layout/src",
    "@phosphorwc/tab-layout/src",
  ],
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
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ]
  }
}

export default config;