(function() {
    'use strict';

    angular.module('app-routes', [
        'ui.router',
        'content-layout',
        'content-homepage',
        'content-about',
        'content-settings',
        'content-forgot'
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

            $stateProvider.state('app.about', {
                url: '/about',
                views: {
                    'content': angular.module('content-about').stateConfig
                },
                cache: false
            });

            $stateProvider.state('app.settings', {
                url: '/settings',
                views: {
                    'content': angular.module('content-settings').stateConfig
                },
                cache: false
            });

            $stateProvider.state('app.forgot', {
                url: '/forgot',
                views: {
                    'content': angular.module('content-forgot').stateConfig
                },
                cache: false
            });

            $urlRouterProvider.otherwise("/app/home");

        }
    ]);
})();


