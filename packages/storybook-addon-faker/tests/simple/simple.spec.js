const pluginTester = require("babel-plugin-tester").default;

const plugin = require("../../dist/babel/index.cjs");

const path = require("path");

pluginTester({
  plugin,
  fixtures: path.join(__dirname, "fixtures"),
});
