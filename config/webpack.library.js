const path = require("path");
const webpack = require("webpack");

module.exports = {
  name: 'music-metadata',
  mode: 'production',
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.IgnorePlugin(/fs/, /debug/)
  ],
  entry: {
    bundle: "./node_modules/music-metadata/lib/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "music-metadata.js",
    libraryTarget: "umd"
  }
};
