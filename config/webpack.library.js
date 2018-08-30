const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'music-metadata',
  mode: 'production',
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.IgnorePlugin(/fs/, /debug/),
    new DtsBundlePlugin()
  ],
  entry: {
    bundle: './node_modules/music-metadata/lib/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'music-metadata.js',
    libraryTarget: 'umd'
  }
};

function DtsBundlePlugin(){}
DtsBundlePlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function(){
    var dts = require('dts-bundle');

    dts.bundle({
      name: 'music-metadata',
      main: 'node_modules/music-metadata/lib/index.d.ts',
      out: '../../../dist/index.d.ts',
      removeSource: false,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};