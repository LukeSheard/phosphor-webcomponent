import { kebabCase } from "lodash";
import * as webpack from "webpack";

const LIBRARY_NAME = "PhosphorLayout";
const FILENAME = kebabCase(LIBRARY_NAME);
const ENVIRONMENTS = [false, true];

const BASE_CONFIG: webpack.Configuration = {
  context: __dirname,
  entry: "./src/index.ts",
  externals: {
    "@phosphor/widgets": {
      amd: "@phosphor/widgets",
      commonjs: "@phosphor/widgets",
      commonjs2: "@phosphor/widgets",
      root: "phosphor"
    }
  } as any,
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /.tsx?$/
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  }
};

const CJS_CONFIG = (prod: boolean) =>
  ({
    ...BASE_CONFIG,
    output: {
      ...BASE_CONFIG.output,
      filename: `cjs/${FILENAME}${prod ? ".min" : ""}.js`,
      libraryTarget: "commonjs"
    }
  } as webpack.Configuration);

const UMD_CONFIG = (prod: boolean) =>
  ({
    ...BASE_CONFIG,
    output: {
      ...BASE_CONFIG.output,
      filename: `${FILENAME}${prod ? ".min" : ""}.js`,
      library: LIBRARY_NAME,
      libraryTarget: "umd"
    }
  } as webpack.Configuration);

const ENVIRONMENT_CONFIGS = [CJS_CONFIG, UMD_CONFIG];

export default ENVIRONMENTS.reduce(
  (configs, environment) => {
    const environmentConfigs = ENVIRONMENT_CONFIGS.map(c => c(environment));
    return configs.concat(environmentConfigs);
  },
  [] as webpack.Configuration[]
);
