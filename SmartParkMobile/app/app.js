(function () {
    'use strict';

    var app = angular.module('app', ['app-routes', 'appTemplates','ngCordova']);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptorFactory');
    });

    app.constant('CONFIG', {
        hashHeaderName: 'HashHeader',
        apiGlobalUrl: "http://localhost:9873/Api",
        localStorageEnum: {
            "charges": "charges",
            "email": "email",
            "hash": "hash",
            "name":"name"
        },
        ConnectivityProblemMessage: "Wyst�pi� b��d po��czenia, sprawd� ��czno�� z internetem.",
        notificationEnum: {
            "error": "error",
            "success": "success"
        }
    });
})();

