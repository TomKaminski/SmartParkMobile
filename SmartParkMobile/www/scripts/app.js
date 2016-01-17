(function () {
    'use strict';

    var app = angular.module('app', ['app-routes', 'appTemplates']);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptorFactory');
    });

    app.constant('CONFIG', {
        hashHeaderName: 'HashHeader',
        apiGlobalUrl: "http://localhost:9873/Api",
        localStorageEnum: {
            "charges": "charges",
            "email": "email",
            "hash": "hash"
        }
    });
})();


(function () {
    'use strict';

    function accountService(localStorageFactory, CONFIG) {

        var userData = {
            loggedIn : false,
            charges : null,
            userEmail: null,
            memoryHash: null
        }

        this.updateCharges = function () {
            userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
        };

        this.login = function (hash, email, charges) {
            localStorageFactory.set(CONFIG.localStorageEnum.email, email);
            localStorageFactory.set(CONFIG.localStorageEnum.hash, hash);
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            userData.loggedIn = true;
            userData.charges = charges;
            userData.userEmail = email;
            userData.memoryHash = hash;
        };

        this.getAccountData = function () {
            return userData;
        };

        this.initUserContext = function () {
            if (userData.loggedIn === true && userData.memoryHash !== null) {
                return userData;
            }

            userData.memoryHash = localStorageFactory.get(CONFIG.localStorageEnum.hash);
            if (userData.memoryHash === null) {
                userData.loggedIn = false;
                userData.charges = null;
                userData.userEmail = null;
            } else {
                userData.userEmail = localStorageFactory.get(CONFIG.localStorageEnum.email);
                userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
                userData.loggedIn = true;
            }
            return userData;
        };

        this.logout = function () {
            userData.loggedIn = false;
            userData.charges = null;
            userData.userEmail = null;
            userData.memoryHash = null;
            localStorageFactory.clear();
        };
    }
    angular.module('app').service('accountService', ['localStorageFactory', 'CONFIG', accountService]);
})();
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



(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout) {

        var self = this;
        refreshUserContext();
        self.countText = "Otwórz bramę!";

        //self.init = function () {
        //    debugger;
        //    refreshUserContext();
        //}

        self.login = function (email, password) {
            self.processing = true;
            self.loginError = "";

            apiFactory.post(apiFactory.apiEnum.login, { UserName: email, Password: password }).then(function (data) {
                self.processing = false;
                if (data.IsValid === true) {
                    accountService.login(data.Result.PasswordHash, email, data.Result.Charges);
                    refreshUserContext();
                } else {
                    self.loginError = data.ValidationErrors[0];
                }
            }, function () {
                self.loginError = "Wystąpił błąd logowania.";
                self.processing = false;
            });
        }

        self.logout = function () {
            accountService.logout();
            refreshUserContext();
        }

        function refreshUserContext() {
            self.user = accountService.initUserContext();
        }

        //var i = 5;
        //function removeDisabled() {
        //    if (i !== 0) {
        //        $timeout(function () {
        //            i--;
        //            self.countText = i + "...";
        //            removeDisabled();
        //        }, 1000);
        //    }
        //    if (i === 0) {
        //        self.turnOff = false;
        //        self.countText = "Otwórz bramę!";
        //        i = 5;
        //    }
        //}

        //self.GetStudentDataWithHeader = function(userName) {
        //    apiFactory.post(apiFactory.apiEnum.GetStudentDataWithHeader, { userName: userName }).then(function (data) {
        //        console.log(data);
        //        if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
        //            accountService.login(data.PasswordHash, userName, data.Result.Charges);
        //        }
        //    }, function (err) {
        //        console.log(err);
        //    });
        //};

        //self.GetStudentDataWithoutHeader = function (userName) {
        //    apiFactory.post(apiFactory.apiEnum.GetStudentDataWithoutHeader, { userName: userName }).then(function (data) {
        //        console.log(data);
        //        if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
        //            accountService.login(data.Result.PasswordHash, userName, data.Result.Charges);
        //        }
        //    }, function (err) {
        //        console.log(err);
        //    });
        //};

        //self.CheckUserHeader = function (userName) {
        //    apiFactory.post(apiFactory.apiEnum.CheckUserHeader, { userName: userName }).then(function (data) {
        //        console.log(data);
        //    }, function (err) {
        //        console.log(err);
        //    });
        //};
    }

    angular.module('content-homepage').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout', homepageController]);
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