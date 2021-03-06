// Karma configuration
// Generated on Wed Apr 08 2020 14:39:59 GMT+1000 (Australian Eastern Standard Time)

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      { pattern: "src/**/*.js" },
      // { pattern: 'src/**/*.spec.js'}
      // { pattern: 'src/**/!(*spec).js'},
    ],

    // list of files / patterns to exclude
    exclude: ["src/index.js"],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/**/*.js": ["webpack"],
      // 'src/**/*spec.js': ['webpack'],
      // 'src/**/!(*spec).js': ['webpack', 'coverage']
    },

    webpack: {
      mode: "development",
      module: {
        rules: [
          {
            exclude: /node_modules/,
            test: /\.js$/i,
            loader: "babel-loader",
          },
          {
            test: /\.(jpe?g|png|gif|svg|map|css|std|indent|html|txt)$/i,
            loader: "ignore-loader",
          },
        ],
      },
    },
    webpackMiddleware: {
      noInfo: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["dots", "coverage"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ["Chrome", "Firefox", "IE"],
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
