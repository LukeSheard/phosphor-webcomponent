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

const createConfig = (prod: boolean, output: webpack.Output) => {
  const config = {
    ...BASE_CONFIG,
    output
  } as webpack.Configuration;

  if (prod) {
    config.plugins = [new webpack.optimize.UglifyJsPlugin()];
  }

  return config;
};

const CJS_CONFIG = (prod: boolean) =>
  createConfig(prod, {
    filename: `cjs/${FILENAME}${prod ? ".min" : ""}.js`,
    libraryTarget: "commonjs"
  });

const UMD_CONFIG = (prod: boolean) =>
  createConfig(prod, {
    ...BASE_CONFIG.output,
    filename: `${FILENAME}${prod ? ".min" : ""}.js`,
    library: LIBRARY_NAME,
    libraryTarget: "umd"
  });

const ENVIRONMENT_CONFIGS = [CJS_CONFIG, UMD_CONFIG];

export default ENVIRONMENTS.reduce(
  (configs, environment) => {
    const environmentConfigs = ENVIRONMENT_CONFIGS.map(createEnvConfig => createEnvConfig(environment));
    return configs.concat(environmentConfigs);
  },
  [] as webpack.Configuration[]
);
