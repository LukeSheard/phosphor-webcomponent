import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as fs from "fs";
import * as path from "path";
import * as webpack from "webpack";

const LIBRARY_NAME = "PhosphorWC";
const ROOT_DIR = path.resolve(__dirname);
const PKG_DIR = process.cwd();
const PKG_NAME = path.basename(PKG_DIR);

const externals: any = fs
  .readdirSync(path.join(ROOT_DIR, "packages"))
  .filter(packageName =>
    fs.statSync(path.join(ROOT_DIR, "packages", packageName)).isDirectory() && packageName !== PKG_NAME
  ).reduce((externals, packageName) => {
    const packageJSON = require(path.join(ROOT_DIR, "packages", packageName, "package.json"))
    const npmPackageName = packageJSON.name;
    return {
      ...externals,
      [npmPackageName]: {
        amd: npmPackageName,
        commonjs: npmPackageName,
        commonjs2: npmPackageName,
        root: `LIBRARY_NAME[${packageName}]`
      }
    };
  }, {
    "@phosphor/widgets": {
      amd: "@phosphor/widgets",
      commonjs: "@phosphor/widgets",
      commonjs2: "@phosphor/widgets",
      root: "phosphor"
    }
  });

export default function(env: string) {
  const PROD = env === "production";
  const config: webpack.Configuration = {
    context: PKG_DIR,
    entry: {
      [PKG_NAME]: path.join(PKG_DIR, "src", "index.ts"),
    },
    output: {
      path: ROOT_DIR,
      filename: `packages/${PKG_NAME}/dist/[name]${PROD ? ".min" : ""}.js`,
      library: [ LIBRARY_NAME, "[name]" ],
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: "ts-loader"
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  minimize: PROD
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin(`packages/${PKG_NAME}/dist/[name]${PROD ? ".min" : ""}.css`),
    ],
    externals,
    resolve: {
      extensions: [
        ".js",
        ".ts"
      ]
    }
  };

  return config;
}
