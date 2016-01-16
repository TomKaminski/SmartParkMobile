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
