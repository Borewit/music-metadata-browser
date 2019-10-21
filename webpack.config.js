// Webpack config for the UMD bundle

const path = require("path");

module.exports = {
  entry: "./lib/index.js",
  mode: "production",
  output: {
    library: "musicMetadata",
    libraryTarget: "umd",
    filename: "musicmetadata.js",
    path: path.resolve(__dirname, "umd")
  }
};
