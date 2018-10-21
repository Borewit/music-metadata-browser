// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path')

module.exports = config => {
  config.set({
    basePath: '.',
    frameworks: [
      'jasmine'
    ],
    files: [
      {pattern: 'src/**/*.spec.ts'}
    ],
    preprocessors: {
      '**/*.ts': 'webpack',
    },

    webpack: {
      mode: 'development',
      entry: './src/index.ts',
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader',
            include: path.resolve('src')
          },
          {
            test: /\.ts$/,
            use: {loader: 'istanbul-instrumenter-loader'},
            enforce: 'post',
            include: path.resolve('src'),
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
      }
    },

    // global BrowserStack configuration
    browserStack: {
      forcelocal: true  // force traffic through the local BrowserStack tunnel, passes flag through to BrowserStackTunnel
    },

    // define browsers
    customLaunchers: {
      bs_win_chrome_69: {
        base: 'BrowserStack',
        browser: 'Chrome',
        browser_version: '69.0',
        os: 'Windows',
        os_version: '10'
      },
      bs_win_firefox_62: {
        base: 'BrowserStack',
        browser: 'Firefox',
        browser_version: '62.0',
        os: 'Windows',
        os_version: '10'
      }
    },

    //autoWatch: true,
    browsers: ['Chrome'],
    colors: true,
    singleRun: false,
  })
}