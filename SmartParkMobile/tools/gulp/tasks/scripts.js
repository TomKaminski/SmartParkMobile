module.exports = function(gulp, plugins, config) {

    gulp.task('scripts', ['scripts-app', 'scripts-templates', 'scripts-vendors']);

    gulp.task('scripts-app', ['scripts-app-concat'], function() {
        return gulp.src(config.paths.scripts.app.src)
            .pipe(plugins.jshint(config.jshint))
            .pipe(plugins.jshint.reporter('jshint-stylish'));
    });

    gulp.task('scripts-app-concat', function() {
        return gulp.src(config.paths.scripts.app.src)
            .pipe(plugins.concat('app.js'))
            .pipe(gulp.dest(config.paths.scripts.dest));
    });

    gulp.task('scripts-templates', function() {
        return gulp.src(config.paths.scripts.templates.src)
            .pipe(plugins.minifyHtml({ empty: true, spare: true, quotes: true }))
            .pipe(plugins.html2js({
                outputModuleName: "appTemplates",
                useStrict: true
            }))
            .pipe(plugins.concat("templates.js"))
            .pipe(gulp.dest(config.paths.scripts.dest))
            ;
    });

    gulp.task('scripts-vendors', function() {
       return gulp.src(config.paths.scripts.vendors.list)
           .pipe(plugins.concat('vendors.js'))
           .pipe(gulp.dest(config.paths.scripts.dest));
    });

};