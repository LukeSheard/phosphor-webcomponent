import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as fs from "fs";
import * as path from "path";
import * as webpack from "webpack";

const LIBRARY_NAME = "PhosphorWC";
const ROOT_DIR = path.resolve(__dirname);
const PACKAGE_FOLDERS = fs
  .readdirSync(path.join(ROOT_DIR, "packages"))
  .filter(packageName =>
    fs.statSync(path.join(ROOT_DIR, "packages", packageName)).isDirectory()
  );

const externals: any = PACKAGE_FOLDERS.reduce((externals, packageName) => {
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

const entry = PACKAGE_FOLDERS.reduce((entries, packageName) => ({
  ...entries, 
  [packageName]: `./packages/${packageName}/src/index.ts`
}), {});

export default function(env: string) {
  const PROD = env === "production";
  const config: webpack.Configuration = {
    context: __dirname,
    devtool: PROD ? false : "source-map",
    entry,
    output: {
      filename: `packages/[name]/dist/[name]${PROD ? ".min" : ""}.js`,
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
          test: /\.(scss|css)$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  minimize: PROD,
                  sourceMap: true
                }
              },
              "sass-loader"
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin(`packages/[name]/dist/[name]${PROD ? ".min" : ""}.css`),
    ],
    externals,
    resolve: {
      extensions: [
        ".js",
        ".ts",
        ".scss"
      ]
    }
  };

  return config;
}
