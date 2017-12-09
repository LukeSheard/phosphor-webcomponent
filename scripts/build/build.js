const { mkdirSync } = require("fs");
const { join } = require("path");

const cwd = process.cwd();
const pkgJSON = require(join(cwd, "package.json"));

try {
  mkdirSync(join(cwd, "dist"));
} catch (e) {
  if (e.code !== "EEXIST") {
    throw e;
  }
}

const createRollup = require("./rollup");

const rollup = createRollup();
const filename = `${pkgJSON.name}${process.env.NODE_ENV === "PRODUCTION" ? ".min" : ""}.js`;

const bundle = ({ write }) => write({
  file: `dist/${filename}`,
  format: "umd",
  indent: true,
  name: pkgJSON.name.replace("-", "."),
  sourcemap: false
});

rollup
  .catch()
  .then(bundle)
  .then(() => {
    console.log(`${pkgJSON.name} is DONE`);
  })
  .catch(error => {
    console.error(error); // Print whole error object

    if (error.snippet) {
      console.error('\u001b[31;1m');
      console.error('\n-------- Details -------');
      console.error(error.id);
      console.error(error.loc);
      console.error('\n-------- Snippet --------');
      console.error(error.snippet);
      console.error('\n-------------------------');
      console.error('\u001b[0m')
    }

    console.error(
      `${pkgJSON.name} in ${options.format} is FAILED ${error.message}`
    );
    exit(1);
  });