(function () {
    'use strict';

    angular.module('app', ['app-routes', 'appTemplates']).config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptorFactory');
    });
})();


(function () {
    'use strict';

    function accountService(localStorageFactory) {

        var loggedIn;
        var userCharges;
        var userEmail;
        var memoryHash;

        this.updateCharges = function() {
            userCharges = localStorageFactory.get('charges');
        };

        this.login = function(hash, email, charges) {
            localStorageFactory.set('email', email);
            localStorageFactory.set('hash', hash);
            localStorageFactory.set('charges', charges);
            loggedIn = true;
            userCharges = charges;
            userEmail = email;
            memoryHash = hash;
        };

        this.getAccountData = function() {
            return {
                loggedIn,
                userCharges,
                userEmail,
                memoryHash
            };
        };

        this.checkIfLogged = function() {
            memoryHash = localStorageFactory.get('hash');
            if (memoryHash === null) {
                return false;
            } else {
                userEmail = localStorageFactory.get('email');
                userCharges = localStorageFactory.get('charges');
                loggedIn = true;
                return true;
            }
        };

        this.fastCheckIfLogged = function() {
            return loggedIn;
        };

        this.logout = function() {
            loggedIn = false;
            userCharges = null;
            userEmail = null;
            memoryHash = null;
            localStorageFactory.clear();
        };
    }
    angular.module('app').service('accountService', accountService);
})();
(function () {
    'use strict';

    function apiFactory($http, $q) {

        var globalPath = "http://localhost:9873/Api";

        var apiEnum = {
            login: "/Account/Login",
            changePassword: "/Manage/ChangePassword",
            GetStudentDataWithHeader: "/Test/GetStudentDataWithHeader",
            GetStudentDataWithoutHeader: "/Test/GetStudentDataWithoutHeader",
            CheckUserHeader: "/Test/CheckUserHeader"
        }

        function get(apiUrl, options) {
            var defered = $q.defer();
            $http.get(globalPath + apiUrl, { params: options })
                .success(function (data) {
                    defered.resolve(data);
                }).error(function () {
                    defered.reject(false);
                });
            return defered.promise;
        }

        function post(apiUrl, options) {
            var defered = $q.defer();
            $http.post(globalPath + apiUrl, options)
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

    angular.module('app').factory('apiFactory', apiFactory);
})();
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
(function () {
    'use strict';

    function localStorageFactory() {

        function set(name, value) {
            window.localStorage.setItem(name, value);
        }

        function get(name) {
            return window.localStorage.getItem(name);
        }

        function clear() {
            window.localStorage.clear();
        }

        return {
            set: set,
            get: get,
            clear: clear
        }
    }
    angular.module('app').factory('localStorageFactory', localStorageFactory);
})();
(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/layout/templates/index.html');
                }
            ],
            controller: 'layoutCtrl',
            controllerAs: 'layoutCtrl'
        };
    }

    angular.module('content-layout', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();


(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/homepage/templates/index.html');
                }
            ],
            controller: 'homepageCtrl',
            controllerAs: 'homepageCtrl'
        };
    }

    angular.module('content-homepage', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();




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
})();



(function () {
    'use strict';

    function layoutController($ionicSideMenuDelegate) {
        var self = this;

        self.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }

    angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate', layoutController]);
})();
(function () {
    'use strict';

    function homepageController(accountService, apiFactory) {

        var self = this;

        self.GetStudentDataWithHeader = function(userName) {
            apiFactory.post(apiFactory.apiEnum.GetStudentDataWithHeader, { userName: userName }).then(function (data) {
                console.log(data);
                debugger;
                if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
                    accountService.login(data.PasswordHash, userName, data.Result.Charges);
                }
            }, function (err) {
                console.log(err);
            });
        };

        self.GetStudentDataWithoutHeader = function (userName) {
            apiFactory.post(apiFactory.apiEnum.GetStudentDataWithoutHeader, { userName: userName }).then(function (data) {
                console.log(data);
                debugger;
                if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
                    accountService.login(data.Result.PasswordHash, userName, data.Result.Charges);
                }
            }, function (err) {
                console.log(err);
            });
        };

        self.CheckUserHeader = function (userName) {
            apiFactory.post(apiFactory.apiEnum.CheckUserHeader, { userName: userName }).then(function (data) {
                debugger;
                console.log(data);
            }, function (err) {
                console.log(err);
            });
        };
    }

    angular.module('content-homepage').controller('homepageCtrl', homepageController);
})();


