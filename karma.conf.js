// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');
const webpack = require('webpack');

module.exports = config => {
  config.set({
    basePath: 'lib',
    frameworks: [
      'jasmine'
    ],
    files: [
      {pattern: '**/*.spec.ts'}
    ],
    preprocessors: {
      '**/*.ts': 'webpack'
    },

    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {'buffer': require.resolve('buffer/')}
      },
      // Ensure buffer is available
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer']
        })
      ],
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader'
          },
          {
            test: /\.ts$/,
            use: {loader: 'istanbul-instrumenter-loader'},
            enforce: 'post',
            exclude: /\.spec\.ts$/
          }

        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['dots', 'coverage-istanbul', 'BrowserStack'],
    // https://www.npmjs.com/package/karma-coverage-istanbul-reporter
    coverageIstanbulReporter: {
      dir: path.join(__dirname, 'coverage'),
      reports: ['text-summary', 'lcovonly'],
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      },
      combineBrowserReports: true // Combines coverage information from multiple browsers into one report
    },

    // global BrowserStack configuration
    browserStack: {
      forcelocal: true,  // force traffic through the local BrowserStack tunnel, passes flag through to BrowserStackTunnel
      project: 'music-metadata-browser',
      timeout: 30,  // BROWSERSTACK_IDLE_TIMEOUT
      captureTimeout: 30
    },

    // define browsers, see https://www.browserstack.com/automate/capabilities
    customLaunchers: {
      bs_win_chrome: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '88.0'
      },
      bs_win_firefox: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Firefox',
        browser_version: '84.0'
      },
      bs_osx_safari: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Big Sur',
        browser: 'Safari',
        browser_version: '14'
      },
      bs_win_edge: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Edge',
        browser_version: '88'
      }
    },

    mocha: {
      timeout: 20000 // 20 seconds
    },

    //autoWatch: true,
    browsers: ['Chrome'],
    colors: true,

    // Increase time-outs to prevent disconnects on BrowserStack
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 4 * 60 * 1000, //default 10000
    captureTimeout: 4 * 60 * 1000 //default 60000
  });
};
