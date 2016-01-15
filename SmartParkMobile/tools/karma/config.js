module.exports = function(config) {
    config.set({
        basePath: './../../',
        frameworks: ['jasmine'],
        files: config.files,
        exclude: [],
        preprocesors: [],
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_WARN, /* LOG_DISABLE | LOG_ERROR | LOG_WARN | LOG_INFO | LOG_DEBUG */
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};