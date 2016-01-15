module.exports = function(gulp, plugins, config) {
    gulp.task('build-development', ['clean-rev', 'scripts', 'styles', 'server'], function () {
        return gulp.src(config.paths.build.templates.index)
            .pipe(gulp.dest(config.paths.build.dest));
    });

    gulp.task('server', function () {
        plugins.connect.server({
            root: config.paths.build.dest,
            host: config.server.host,
            port: config.server.port,
            fallback: config.paths.build.dest + 'index.html',
            livereload: config.server.livereload
        });
    });

    gulp.task('build-cordova', ['clean-rev', 'scripts', 'styles'], function () {
        return gulp.src(config.paths.build.templates.cordova)
            .pipe(plugins.rename(function(path) {
                path.basename = 'index';
            }))
            .pipe(gulp.dest(config.paths.build.dest));
    });
};
