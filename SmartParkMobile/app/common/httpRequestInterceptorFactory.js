(function () {
    'use strict';

    function httpRequestInterceptorFactory(localStorageFactory) {
        return {
            request: function (config) {
                config.headers['HashHeader'] = localStorageFactory.get('hash') || "";
                return config;
            }
        };
    }
    angular.module('app').factory('httpRequestInterceptorFactory', httpRequestInterceptorFactory);
})();