(function() {
    'use strict';

    angular.module('app-routes', [
        'ui.router',
        'content-layout',
        'content-homepage'
    ]).config([
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
                },
                cache: false
            });

            $stateProvider.state('app.homepage', {
                url: '/home',
                views: {
                    'content': angular.module('content-homepage').stateConfig
                },
                cache: false
            });
            $stateProvider.state('app.homepage.alias', {
                url: '/',
                cache: false
            });

            $urlRouterProvider.otherwise("/app/home");

        }
    ]);
})();


