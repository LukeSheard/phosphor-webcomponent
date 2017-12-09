const { join } = require("path");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const tsPlugin = require("rollup-plugin-typescript2");

module.exports = function(version, options) {
  const plugins = [
    nodeResolve({
      extensions: [".ts", ".js", ".json"],
      jsnext: true,
      customResolveOptions: {
        moduleDirectory: join(__dirname, "../../node_modules"),
      }
    }),
    commonjs({
      include: "node_modules/**"
    }),
    tsPlugin({
      abortOnError: true,
      cacheRoot: `.rpt2_cache_${process.env.NODE_ENV || "development"}`,
      check: true,
      clean: true,
      exclude: ["*.spec*", "**/*.spec*"],
      tsconfig: __dirname + "/../../tsconfig.json" // Have absolute path to fix windows build
    }),
  ];

  return plugins;
};
