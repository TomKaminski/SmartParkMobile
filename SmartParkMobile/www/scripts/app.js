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
            "hash": "hash",
            "name":"name"
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
            memoryHash: null,
            userName: null
        }

        this.updateCharges = function (charges) {
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
        };

        this.login = function (hash, email, charges, name) {
            localStorageFactory.set(CONFIG.localStorageEnum.email, email);
            localStorageFactory.set(CONFIG.localStorageEnum.hash, hash);
            localStorageFactory.set(CONFIG.localStorageEnum.charges, charges);
            localStorageFactory.set(CONFIG.localStorageEnum.name, name);

            userData.loggedIn = true;
            userData.charges = charges;
            userData.userEmail = email;
            userData.memoryHash = hash;
            userData.userName = name;
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
                userData.userName = null;
            } else {
                userData.userEmail = localStorageFactory.get(CONFIG.localStorageEnum.email);
                userData.charges = localStorageFactory.get(CONFIG.localStorageEnum.charges);
                userData.userName = localStorageFactory.get(CONFIG.localStorageEnum.name);
                userData.loggedIn = true;
            }
            return userData;
        };

        this.logout = function () {
            userData.loggedIn = false;
            userData.charges = null;
            userData.userEmail = null;
            userData.userName = null;
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
            Login: "/Account/Login",
            ChangePassword: "/Manage/ChangePassword",
            ForgotPassword: "/Account/ForgotPassword",
            OpenGate: "/Parking/OpenGate",
            RefreshCharges: "/Parking/RefreshCharges",
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



(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/forgot/templates/forgot.html');
                }
            ],
            controller: 'forgotCtrl',
            controllerAs: 'forgotCtrl'
        };
    }

    angular.module('content-forgot', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();




(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/about/templates/index.html');
                }
            ],
            controller: 'aboutCtrl',
            controllerAs: 'aboutCtrl'
        };
    }

    angular.module('content-about', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();




(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/settings/templates/settings.html');
                }
            ],
            controller: 'settingsCtrl',
            controllerAs: 'settingsCtrl'
        };
    }

    angular.module('content-settings', ['appTemplates', 'ionic']).stateConfig = stateConfig();
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


(function () {
    'use strict';

    function forgotController(accountService, apiFactory) {
        var self = this;

        self.forgotPassword = function (email) {
            self.processing = true;
            self.error = "";
            apiFactory.post(apiFactory.apiEnum.forgotPassword, { Email: email }).then(function (data) {
                self.processing = false;
                if (data === true) {
                    self.error = "Email został wysłany.";
                } else {
                    self.error = "Wystąpił błąd.";
                }
            }, function () {
                self.error = "Wystąpił błąd połączenia.";
                self.processing = false;
            });
        }
    }

    angular.module('content-forgot').controller('forgotCtrl', ['accountService', 'apiFactory', '$timeout', forgotController]);
})();



(function () {
    'use strict';

    function aboutCtrl() {
        var self = this;
    }

    angular.module('content-about').controller('aboutCtrl', aboutCtrl);
})();



(function () {
    'use strict';

    function settingsController(accountService, apiFactory) {
        var self = this;

        self.changePassword = function (code, newCode) {
            self.processing = true;
            self.error = "";

            var accData = accountService.getAccountData();
            apiFactory.post(apiFactory.apiUrlEnum.changeCode, { Email: accData.userEmail, Code: code, NewCode: newCode }).then(function (data) {
                self.processing = false;
                if (data.Result.Changed === true) {
                    self.error = "Hasło zostało zmienione, zaloguj się do aplikacji używając nowego hasła.";
                    accountService.logout();
                } else if (data.Changed === false) {
                    self.error = data.Message === undefined ? "Wystąpił błąd, podane obecne hasło jest niepoprawne." : data.Message;
                } else {
                    accountService.logout();
                    self.loginError = "Takie konto nie istnieje.";
                }
            }, function () {
                self.error = "Wystąpił błąd połączenia.";
                self.processing = false;
            });
        };

        self.changeEmail = function (newEmail, pass) {
            self.processingEmail = true;
            self.errorEmail = "";

            var accData = accountService.getAccountData();
            apiFactory.post(apiFactory.apiUrlEnum.changeEmail, { NewEmail: newEmail, Password: pass, Email: accData.userEmail }).then(function (data) {
                self.processingEmail = false;
                self.errorEmail = data.Message;
                if (data.Changed === true) {
                    accountService.logout();
                }
            }, function () {
                self.error = "Wystąpił błąd połączenia.";
                self.processingEmail = false;
            });
        };

    }

    angular.module('content-settings').controller('settingsCtrl', ['accountService', 'apiFactory', '$timeout', settingsController]);
})();



(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout) {

        var self = this;
        refreshUserContext();
        self.countText = "Otwórz bramę!";

        self.login = function (email, password) {
            self.processing = true;
            self.loginError = "";

            apiFactory.post(apiFactory.apiEnum.login, { UserName: email, Password: password }).then(function (data) {
                self.processing = false;
                if (data.IsValid === true) {
                    accountService.login(data.Result.PasswordHash, email, data.Result.Charges, data.Result.Name);
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

        var i = 5;
        function removeDisabled() {
            if (i !== 0) {
                $timeout(function () {
                    i--;
                    self.countText = i + "...";
                    removeDisabled();
                }, 1000);
            }
            if (i === 0) {
                self.turnOff = false;
                self.countText = "Otwórz bramę!";
                i = 5;
            }
        }
        
        self.openGates = function () {
            refreshUserContext();
            var accData = accountService.getAccountData();
            if (accData.loggedIn === true) {
                self.turnOff = true;
                self.processing = true;
                self.gateError = "";

                apiFactory.post(apiFactory.apiEnum.openGate, { Email: accData.userEmail }).then(function (data) {
                    self.processing = false;
                    if (data !== null) {
                        accountService.updateCharges(data.Result);
                        refreshUserContext();
                        if (data !== 0) {
                            self.countText = 5 + "...";
                            removeDisabled();
                        } else {
                            self.gateError = "Brak wyjazdów.";
                            self.turnOff = false;
                        }
                    } else {
                        self.turnOff = false;
                        window.localStorage.clear();
                        refreshUserContext();
                    }
                }, function () {
                    self.turnOff = false;
                    self.processing = false;
                    self.gateError = "Wystąpił błąd połączenia.";
                });
            }
        }

        self.refresh = function () {
            refreshUserContext();
            if (self.user.loggedIn === true) {
                self.processingRefresh = true;
                self.refreshError = "";

                apiFactory.post(apiFactory.apiEnum.refreshCharges, { Email: self.user.userEmail }).then(function (data) {
                    self.processingRefresh = false;
                    accountService.updateCharges(data.Result);
                    refreshUserContext();
                }, function () {
                    self.refreshError = "Wystąpił błąd połączenia.";
                    self.processingRefresh = false;
                });
            }
        };

    }

    angular.module('content-homepage').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout', homepageController]);
})();



(function () {
    'use strict';

    function layoutController($ionicSideMenuDelegate, accountService, $state) {
        var self = this;

        self.getUserContext = function() {
            return accountService.initUserContext();
        }

        self.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        self.logout = function () {
            $ionicSideMenuDelegate.toggleLeft();
            accountService.logout();
            accountService.initUserContext();
        }

        self.goTo = function (state) {
            $state.go(state);
            $ionicSideMenuDelegate.toggleLeft();
        }
    }

    angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate', 'accountService', '$state', layoutController]);
})();