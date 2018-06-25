const path = require("path");
const webpack = require("webpack");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  name: 'music-metadata',
  mode: 'production',
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.IgnorePlugin(/fs/, /debug/),
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      uglifyOptions: {
        compress: {
          // Workaround: https://github.com/mishoo/UglifyJS2/issues/2842
          inline: false
        }
      }
    }),
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
