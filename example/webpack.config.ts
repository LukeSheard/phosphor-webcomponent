import { Configuration } from "webpack";

const config: Configuration = {
  context: __dirname,
  devtool: "inline-source-map",
  entry: [
    // node_modules
    "document-register-element",
    "@phosphor/widgets/style/index.css",

    // web components
    "@phosphorwc/widget/src",
    "@phosphorwc/dock-layout/src",
    "@phosphorwc/tab-layout/src",

    // custom style
    "./style.css",
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
  devServer: {
    contentBase: __dirname,
  },
  resolve: {
    modules: [
      "node_modules",
      "packages"
    ],
    extensions: [
      ".ts",
      ".js"
    ]
  }
}

export default config;