const path = require('path');

module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            {pattern: 'test/test_index.js'},
        ],
        exclude: [],
        preprocessors: {
            'test/test_index.js': ['webpack'],
            'src/**/*.js': ['coverage'],
        },
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    // instrument only testing sources with Istanbul
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true },
                        },
                        include: path.resolve('src/')
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false,
            },
        },
        client: {
            jasmine: {
                random: false,
            },
        },
        reporters: ['spec', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        coverageReporter: {
            reporters: [{type: 'lcov'}],
        },
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                ],
            },
        },
    });
};
