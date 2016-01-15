module.exports = function(gulp, plugins, config) {
    gulp.task('spec', ['scripts'], function () {
        return gulp.src('./dummy')
            .pipe(plugins.karma({
                files: config.paths.spec.list,
                configFile: './tools/karma/config.js',
                action: 'run'
            }))
            .on('error', function (err) {
                this.emit('end');
            });
    });
};