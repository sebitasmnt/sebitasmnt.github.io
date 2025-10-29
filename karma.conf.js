// Karma configuration
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'src/utils/**/*.js',
            'src/utils/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Firefox'],
        singleRun: false,
        concurrency: Infinity,
        plugins: [
            'karma-jasmine',
            'karma-firefox-launcher',
            'karma-spec-reporter'
        ]
    });
};