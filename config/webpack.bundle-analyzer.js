const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const merge = require("webpack-merge");
const prod = require("./webpack.library.js");

const config = merge(prod, {
  plugins: [new BundleAnalyzerPlugin()]
});

module.exports = config;
