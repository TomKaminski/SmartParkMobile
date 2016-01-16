var paths = {
    setup: '',
    styles: {
        dest: 'www/css/',
        main: {
            src: 'src/sass/**/*.scss',
            sass: 'src/sass/'
        },
        vendors: {
            src: 'src/vendors/',
            list: []
        }
    },
    scripts: {
        dest: 'www/scripts/',
        app: {
            src: 'app/**/*.js'
        },
        templates: {
            src: 'app/**/*.html'
        },
        vendors: {
            src: 'src/vendors/',
            list: []
        }
    },
    images: {
        dest: 'www/images'
    },

    build: {
        templates: {
            index: 'src/templates/index.html',
            cordova: 'src/templates/index-cordova.html'
        },
        dest: 'www/'
    },

    spec: {
        src: 'src/spec/**/*.js',
        list: []
    }
};

paths.scripts.vendors.list = [
    paths.scripts.vendors.src + 'ionic/release/js/ionic.bundle.js'
];
paths.styles.vendors.list = [
    paths.styles.vendors.src + 'ionic/release/css/ionic.css'
];
paths.spec.list = [
    paths.scripts.dest + 'vendors.js',
    paths.scripts.dest + 'templates.js',
    paths.scripts.dest + 'app.js',
    paths.spec.src
];

module.exports = {
    paths: paths,
    server: {
        host: 'localhost',
        port: 8080,
        livereload: false
    },
    jshint: {
        "undef": true,
        "camelcase": true,
        "globals": {
            "window": false,
            "document": false,
            "console": false,
            "alert": false,
            "angular": true,
            "require": false,
            "module": false,
            "$": false,
            "jQuery": false,
            "navigator": false
        }
    }
};
