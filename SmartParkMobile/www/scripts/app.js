angular.module('app', [
    // routing
    'app-routes',

    // templates
    'appTemplates'
]);
var homepage = angular.module('content-homepage', ['appTemplates', 'ionic']);

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

var notFound = angular.module('content-layout', ['appTemplates', 'ionic']);

notFound.stateConfig = {
    templateProvider: [
        '$templateCache',
        function ($templateCache) {
            return $templateCache.get('app/content/layout/templates/index.html');
        }
    ],
    controller: 'layoutCtrl',
    controllerAs: 'layoutCtrl'
};

angular.module('app-routes', [
    'ui.router',

    'content-layout',
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
        $locationProvider.html5Mode(false);

        $stateProvider.state('app', {
            abstract: true,
            url: "/app",
            views: {
                'layout': angular.module('content-layout').stateConfig
            }
        });

        $stateProvider.state('app.homepage', {
            url: '/home',
            views: {
                'content': angular.module('content-homepage').stateConfig
            }
        });
        $stateProvider.state('app.homepage.alias', {
            url: '/'
        });

        $urlRouterProvider.otherwise("/app/home");

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

angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate',
    function ($ionicSideMenuDelegate) {
        var self = this;

        self.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }
]);