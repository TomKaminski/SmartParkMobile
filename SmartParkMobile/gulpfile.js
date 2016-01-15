var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    config = require('./tools/gulp/config.js');

require('./tools/gulp/tasks/build.js')(gulp, plugins, config);
require('./tools/gulp/tasks/bower.js')(gulp, plugins, config);
require('./tools/gulp/tasks/clean.js')(gulp, plugins, config);
require('./tools/gulp/tasks/scripts.js')(gulp, plugins, config);
require('./tools/gulp/tasks/styles.js')(gulp, plugins, config);
require('./tools/gulp/tasks/spec.js')(gulp, plugins, config);
require('./tools/gulp/tasks/watch.js')(gulp, plugins, config);

gulp.task('default', ['build-development', 'watch']);
gulp.task('cordova', ['build-cordova']);