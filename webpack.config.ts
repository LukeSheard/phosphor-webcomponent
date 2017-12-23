import * as fs from "fs";
import * as path from "path";
import * as webpack from "webpack";

const packages = fs
  .readdirSync(path.join(__dirname, "packages"))
  .filter(packageName =>
    fs.statSync(path.join(__dirname, "packages", packageName)).isDirectory()
  );
const entry = packages.reduce((entryObj, packageName) => ({
    ...entryObj,
    [packageName]: path.join(__dirname, "packages", packageName, "src/index.ts")
}), {});

export default function(env: string) {
  const PROD = env === "production";
  const config: webpack.Configuration = {
    entry,
    output: {
      path: __dirname,
      filename: `packages/[name]/dist/[name]${PROD ? ".min" : ""}.js`
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          loader: "ts-loader"
        }
      ]
    }
  };

  return config;
}
