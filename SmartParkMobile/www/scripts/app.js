angular.module('app', [
    // routing
    'app-routes',

    // templates
    'appTemplates'
]);

var homepage = angular.module('content-homepage', ['appTemplates']);

homepage.stateConfig = {
    templateProvider: [
        '$templateCache',
        function ($templateCache) {
            return $templateCache.get('app/content/homepage/templates/index.html');
        }
    ],
    controller: 'homepageCtrl',
    controllerAs: 'homepageCtrl'
};

var notFound = angular.module('content-not-found', []);

notFound.stateConfig = {
    templateProvider: [
        '$templateCache',
        function ($templateCache) {
            return $templateCache.get('app/content/not-found/templates/index.html');
        }
    ]
};

angular.module('app-routes', [
    'ui.router',

    'content-not-found',
    'content-homepage'
]);

angular.module('app-routes').config([
    '$stateProvider',
    '$locationProvider',
    '$urlRouterProvider',
    function (
        $stateProvider,
        $locationProvider,
        $urlRouterProvider
    ) {
        $urlRouterProvider.otherwise('/404');

        //$locationProvider.html5Mode(!$window.cordova);
        $locationProvider.html5Mode(false);

        $stateProvider.state('app', {
            abstract: true,
            views: {
            },
            resolve: {
            }
        });

        $stateProvider.state('app.notfound', {
            url: '/404',
            views: {
                'content@': angular.module('content-not-found').stateConfig
            }
        });

        $stateProvider.state('app.homepage', {
            url: '',
            views: {
                'content@': angular.module('content-homepage').stateConfig
            }
        });
        $stateProvider.state('app.homepage.alias', {
            url: '/'
        });

    }
]);

angular.module('content-homepage').controller('homepageCtrl', [
    '$window',
    function (
        $window
    ) {

        var self = this;

        self.model = {
            message: "wiadomość"
        };

        self.show = show;

        function show() {

        }

        if (!!$window.cordova) {
            console.log(navigator.camera);
        }
    }
]);
