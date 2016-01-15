module.exports = function(gulp, plugins, config) {
    gulp.task('bower', function () {
        return plugins.bower({ cwd: './tools/bower' })
            .pipe(gulp.dest(config.paths.scripts.vendors.src));
    });
};