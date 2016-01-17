(function () {
    'use strict';

    function httpRequestInterceptorFactory(localStorageFactory, CONFIG) {
        return {
            request: function (config) {
                config.headers[CONFIG.hashHeaderName] = localStorageFactory.get(CONFIG.localStorageEnum.hash) || "";
                return config;
            }
        };
    }
    angular.module('app').factory('httpRequestInterceptorFactory', ['localStorageFactory', 'CONFIG', httpRequestInterceptorFactory]);
})();