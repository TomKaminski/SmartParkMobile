module.exports = function(gulp, plugins, config) {

    gulp.task('styles', ['styles-main', 'styles-vendors']);

    gulp.task('styles-main', function () {
        return gulp.src(config.paths.styles.main.src)
            .pipe(plugins.sass())
            .on('error', function(error) { console.log(error); this.emit('end'); })
            .pipe(gulp.dest(config.paths.styles.dest));
    });

    gulp.task('styles-vendors', function () {
        return gulp.src(config.paths.styles.vendors.list)
            .pipe(plugins.concat('vendors.css'))
            .pipe(gulp.dest(config.paths.styles.dest));
    });

}
