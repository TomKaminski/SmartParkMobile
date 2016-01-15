module.exports = function(gulp, plugins, config) {
    gulp.task('watch', function () {
       gulp.watch(config.paths.build.templates.index, ['build-development']);

        gulp.watch(config.paths.scripts.app.src, ['scripts-app']);
        gulp.watch(config.paths.scripts.vendors.src, ['scripts-vendors']);
        gulp.watch(config.paths.scripts.templates.src, ['scripts-templates']);
        gulp.watch(config.paths.styles.main.src, ['styles-main']);
    });
};