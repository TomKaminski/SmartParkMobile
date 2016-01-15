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
