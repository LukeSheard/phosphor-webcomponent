if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/phosphor-layout");
} else {
  module.exports = require("./cjs/phosphor-layout.min");
}