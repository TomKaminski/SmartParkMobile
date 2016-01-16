(function () {
    'use strict';

    angular.module('app', ['app-routes', 'appTemplates']).config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptorFactory');
    });
})();

