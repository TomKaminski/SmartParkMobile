(function () {
    'use strict';

    function apiFactory($http, $q, CONFIG) {

        var apiEnum = {
            login: "/Account/Login",
            changePassword: "/Manage/ChangePassword",
            GetStudentDataWithHeader: "/Test/GetStudentDataWithHeader",
            GetStudentDataWithoutHeader: "/Test/GetStudentDataWithoutHeader",
            CheckUserHeader: "/Test/CheckUserHeader"
        }

        function get(apiUrl, options) {
            var defered = $q.defer();
            $http.get(CONFIG.apiGlobalUrl + apiUrl, { params: options })
                .success(function (data) {
                    defered.resolve(data);
                }).error(function () {
                    defered.reject(false);
                });
            return defered.promise;
        }

        function post(apiUrl, options) {
            var defered = $q.defer();
            $http.post(CONFIG.apiGlobalUrl + apiUrl, options)
                .success(function (data) {
                    defered.resolve(data);
                }).error(function (err) {
                    defered.reject(err);
                });
            return defered.promise;
        }

        return {
            get: get,
            apiEnum: apiEnum,
            post: post
        };
    }

    angular.module('app').factory('apiFactory', ['$http', '$q', 'CONFIG', apiFactory]);
})();