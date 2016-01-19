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
        },
        ConnectivityProblemMessage: "Wyst�pi� b��d po��czenia, sprawd� ��czno�� z internetem.",
        notificationEnum: {
            "error": "error",
            "success": "success"
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
            ForgotPassword: "/Account/Forgot",
            OpenGate: "/Parking/OpenGate",
            RefreshCharges: "/Parking/RefreshCharges",
            GetStudentDataWithHeader: "/Test/GetStudentDataWithHeader",
            GetStudentDataWithoutHeader: "/Test/GetStudentDataWithoutHeader",
            CheckUserHeader: "/Test/CheckUserHeader",
            ChangeEmail: "/Manage/ChangeEmail"
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

    function baseCtrl($scope, accountService) {
        this.globalNotifications = [];
        this.globalLoading = false;

        this.getNotifications = function () {
            return this.globalNotifications;
        }

        this.pushToNotifications = function (notification) {
            this.globalNotifications.push(notification);
        }

        this.pushManyToNotifications = function (listOfNotifications, type) {
            angular.forEach(listOfNotifications, function (value) {
                this.push({ value: value, type: type });
            }, this.globalNotifications);
        }

        this.clearNotifications = function () {
            this.globalNotifications = [];
        }

        this.refreshUserContext = function () {
            this.user = accountService.initUserContext();
        }

        this.globalLoadingOff = function() {
            this.globalLoading = false;
        }

        this.globalLoadingOn = function () {
            this.globalLoading = true;
        }
    }

    angular.module('app').controller('baseCtrl', baseCtrl);
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
                    return $templateCache.get('app/content/about/templates/index.html');
                }
            ],
            controller: 'aboutCtrl',
            controllerAs: 'about'
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
                    return $templateCache.get('app/content/forgot/templates/forgot.html');
                }
            ],
            controller: 'forgotCtrl',
            controllerAs: 'forgot'
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
                    return $templateCache.get('app/content/homepage/templates/index.html');
                }
            ],
            controller: 'homepageCtrl',
            controllerAs: 'home'
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
                    return $templateCache.get('app/content/settings/templates/settings.html');
                }
            ],
            controller: 'settingsCtrl',
            controllerAs: 'settings'
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
                    return $templateCache.get('app/content/layout/templates/index.html');
                }
            ],
            controller: 'layoutCtrl',
            controllerAs: 'layout'
        };
    }

    angular.module('content-layout', ['appTemplates', 'ionic']).stateConfig = stateConfig();
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



(function () {
    'use strict';

    function aboutCtrl($controller, $scope) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));
        var self = this;
    }

    angular.module('content-about').controller('aboutCtrl', ['$controller', '$scope', aboutCtrl]);
})();



(function () {
    'use strict';

    function forgotController(accountService, apiFactory, $controller, $scope, CONFIG) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;

        self.forgotPassword = function (email) {
            self.clearNotifications();
            self.globalLoadingOn();
            apiFactory.post(apiFactory.apiEnum.ForgotPassword, { Email: email }).then(function (data) {
                self.globalLoadingOff();
                if (data.IsValid === true) {
                    self.pushToNotifications({ value: "Email został wysłany.", type: CONFIG.notificationEnum.success });
                    console.log("Email został wysłany.");
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                    console.log(data.ValidationErrors);
                }
            }, function () {
                self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
                console.log(CONFIG.ConnectivityProblemMessage);
                self.globalLoadingOff();
            });
        }
    }

    angular.module('content-forgot').controller('forgotCtrl', ['accountService', 'apiFactory', '$controller', '$scope', 'CONFIG', forgotController]);
})();



(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout, $controller, $scope, CONFIG) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;
        self.isGateBtnActive = true;
        self.refreshUserContext();
        self.gateBtnText = "Otwórz bramę!";

        self.login = function (email, password) {
            self.globalLoadingOn();
            self.clearNotifications();
            apiFactory.post(apiFactory.apiEnum.Login, { UserName: email, Password: password }).then(function (data) {
                self.globalLoadingOff();
                if (data.IsValid === true) {
                    accountService.login(data.Result.PasswordHash, email, data.Result.Charges, data.Result.Name);
                    self.refreshUserContext();
                    console.log("Logged in");
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                    console.log(data.ValidationErrors);
                }
            }, function () {
                self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
                self.globalLoadingOff();
                console.log(CONFIG.ConnectivityProblemMessage);
            });
        }

        self.logout = function () {
            accountService.logout();
            self.refreshUserContext();
        }

        var i = 5;
        function removeDisabled() {
            if (i !== 0) {
                $timeout(function () {
                    i--;
                    self.gateBtnText = i + "...";
                    removeDisabled();
                }, 1000);
            }
            if (i === 0) {
                self.isGateBtnActive = true;
                self.gateBtnText = "Otwórz bramę!";
                i = 5;
            }
        }

        self.openGates = function () {
            self.isGateBtnActive = false;
            self.clearNotifications();
            self.refreshUserContext();
            if (self.user.loggedIn === true) {

                self.globalLoadingOn();
                apiFactory.post(apiFactory.apiEnum.OpenGate, { Email: self.user.userEmail }).then(function (data) {
                    self.globalLoadingOff();
                    if (data.IsValid === true) {
                        accountService.updateCharges(data.Result);
                        self.refreshUserContext();
                        if (data.Result !== 0) {
                            self.gateBtnText = 5 + "...";
                            removeDisabled();
                            console.log("Opened");
                        } else {
                            self.pushToNotifications({ value: "Brak wyjazdów.", type: CONFIG.notificationEnum.error });
                            self.isGateBtnActive = true;
                            console.log("Brak wyjazdów.");
                        }
                    } else {
                        self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                        self.isGateBtnActive = true;
                        window.localStorage.clear();
                        self.refreshUserContext();
                        console.log(data.ValidationErrors);
                    }
                }, function () {
                    self.isGateBtnActive = true;
                    self.globalLoadingOff();
                    self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
                    console.log(CONFIG.ConnectivityProblemMessage);
                });
            }
        }

        self.refresh = function () {
            self.clearNotifications();
            self.refreshUserContext();
            if (self.user.loggedIn === true) {
                self.globalLoadingOn();
                self.clearNotifications();
                apiFactory.post(apiFactory.apiEnum.RefreshCharges, { Email: self.user.userEmail }).then(function (data) {
                    self.globalLoadingOff();
                    if (data.IsValid === true) {
                        accountService.updateCharges(data.Result);
                        self.refreshUserContext();
                        console.log("refreshed");
                    } else {
                        self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                        console.log(data.ValidationErrors);
                    }
                }, function () {
                    self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
                    self.globalLoadingOff();
                    console.log(CONFIG.ConnectivityProblemMessage);
                });
            }
        };

    }

    angular.module('content-homepage').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout' , '$controller', '$scope', 'CONFIG', homepageController]);
})();



(function () {
    'use strict';

    function settingsController(accountService, apiFactory, $controller, $scope, CONFIG, $state) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;

        self.changePassword = function (password, newPassword) {
            self.clearNotifications();
            self.globalLoadingOn();
            self.refreshUserContext();

            apiFactory.post(apiFactory.apiEnum.ChangePassword, { Email: self.user.userEmail, OldPassword: password, NewPassword: newPassword, NewPasswordRepeat: newPassword }).then(function (data) {
                self.globalLoadingOff();
                if (data.IsValid) {
                    self.pushToNotifications({ value: "Hasło zostało zmienione, zaloguj się do aplikacji używając nowego hasła.", type: CONFIG.notificationEnum.success });
                    accountService.logout();
                    console.log("Hasło zostało zmienione, zaloguj się do aplikacji używając nowego hasła.");
                    $state.go("app.homepage");
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                    console.log(data.ValidationErrors);
                }
            }, function () {
                self.globalLoadingOff();
                console.log(CONFIG.ConnectivityProblemMessage);
                self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
            });
        };

        self.changeEmail = function (newEmail, pass) {
            self.clearNotifications();
            self.globalLoadingOn();
            self.refreshUserContext();

            apiFactory.post(apiFactory.apiEnum.ChangeEmail, { NewEmail: newEmail, Password: pass, Email: self.user.userEmail }).then(function (data) {
                self.globalLoadingOff();
                self.errorEmail = data.Message;
                if (data.IsValid === true) {
                    self.pushToNotifications({ value: "Email został zmieniony, zaloguj się do aplikacji używając nowego emaila.", type: CONFIG.notificationEnum.success });
                    accountService.logout();
                    console.log("Email został zmieniony, zaloguj się do aplikacji używając nowego emaila.");
                    $state.go("app.homepage");
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                    console.log(data.ValidationErrors);
                }
            }, function () {
                self.globalLoadingOff();
                console.log(CONFIG.ConnectivityProblemMessage);
                self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
            });
        };

    }

    angular.module('content-settings').controller('settingsCtrl', ['accountService', 'apiFactory', '$controller', '$scope', 'CONFIG', '$state', settingsController]);
})();



(function () {
    'use strict';

    function layoutController($ionicSideMenuDelegate, accountService, $state, $controller, $scope) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));
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
            $state.go('app.homepage');
            console.log("loggedOut");
        }

        self.goTo = function (state) {
            $state.go(state);
            $ionicSideMenuDelegate.toggleLeft();
        }
    }

    angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate', 'accountService', '$state','$controller','$scope', layoutController]);
})();