// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path');

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
      '**/*.ts': 'webpack',
    },

    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
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
      },
    },
    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['progress', 'kjhtml', 'coverage-istanbul', 'spec'],
    // https://www.npmjs.com/package/karma-coverage-istanbul-reporter
    coverageIstanbulReporter: {
      dir: path.join(__dirname, 'coverage'),
      reports: ['text-summary', 'lcovonly', 'html'],
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
      timeout: 300,  // BROWSERSTACK_IDLE_TIMEOUT
      captureTimeout: 300
    },

    // define browsers
    customLaunchers: {
      bs_win_chrome: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '77.0'
      },
      bs_win_firefox: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Firefox',
        browser_version: '69.0'
      },
      bs_osx_safari: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Mojave',
        browser: 'Safari',
        browser_version: '12.1'
      },
      bs_win_edge: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Edge',
        browser_version: '18'
      },
      bs_win_opera: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Opera',
        browser_version: '63'
      }
    },

    //autoWatch: true,
    browsers: ['Chrome'],
    colors: true,

    // Increase time-outs to prevent disconnects on BrowserStack
    captureTimeout: 300000,
    browserNoActivityTimeout: 20000,
    browserDisconnectTimeout: 300000,
    browserDisconnectTolerance: 1
  });
};
