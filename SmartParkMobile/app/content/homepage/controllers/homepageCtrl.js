(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout, $controller, $scope, CONFIG) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;
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
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                }
            }, function () {
                self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
                self.globalLoadingOff();
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
            self.clearNotifications();
            self.refreshUserContext();
            if (self.user.loggedIn === true) {
                self.isGateBtnActive = true;
                self.globalLoadingOn();
                apiFactory.post(apiFactory.apiEnum.OpenGate, { Email: self.user.userEmail }).then(function (data) {
                    self.globalLoadingOff();
                    if (data.IsValid === true) {
                        accountService.updateCharges(data.Result);
                        self.refreshUserContext();
                        if (data.Result !== 0) {
                            self.gateBtnText = 5 + "...";
                            removeDisabled();
                        } else {
                            self.pushToNotifications({ value: "Brak wyjazdów.", type: CONFIG.notificationEnum.error });
                            self.isGateBtnActive = true;
                        }
                    } else {
                        self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                        self.isGateBtnActive = true;
                        window.localStorage.clear();
                        self.refreshUserContext();
                    }
                }, function () {
                    self.isGateBtnActive = true;
                    self.globalLoadingOff();
                    self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
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
                    } else {
                        self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                    }
                }, function () {
                    self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
                    self.globalLoadingOff();
                });
            }
        };

    }

    angular.module('content-homepage').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout' , '$controller', '$scope', 'CONFIG', homepageController]);
})();


