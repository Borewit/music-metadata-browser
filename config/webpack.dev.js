const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'music-metadata',
  mode: 'development',
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.IgnorePlugin(/fs/, /debug/)
  ],
  entry: {
    bundle: './src/index'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'music-metadata.js',
    libraryTarget: 'umd'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
