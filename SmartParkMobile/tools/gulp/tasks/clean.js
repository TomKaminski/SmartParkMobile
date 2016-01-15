module.exports = function(gulp, plugins, config) {

    var rimraf          = require('rimraf'),
        path            = require('path'),
        through         = require('through2');

    function cleaner() {
        return through.obj(function(file, enc, cb){
            rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
                if (err) {
                    this.emit('error', new plugins.util.PluginError('Cleanup old files', err));
                }
                this.push(file);
                cb();
            }.bind(this));
        });
    }

    gulp.task('clean-rev', function () {
        gulp.src([config.paths.scripts.dest + '*'], {read: false})
            .pipe(plugins.revOutdated(1))
            .pipe(cleaner());

        gulp.src([config.paths.styles.dest + '*'], {read: false})
            .pipe(plugins.revOutdated(1))
            .pipe(cleaner());

        return;
    });

};