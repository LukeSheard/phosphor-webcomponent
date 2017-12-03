import { Configuration } from "webpack";

const config: Configuration = {
  devtool: "inline-source-map",
  entry: [
    "@phosphor/widgets/style/index.css",
    "./style.css",
    "../src",
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