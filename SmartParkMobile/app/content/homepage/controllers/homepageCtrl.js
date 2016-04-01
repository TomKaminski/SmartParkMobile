(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout, $controller, $scope, CONFIG, $cordovaToast) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;
        self.isGateBtnActive = true;
        self.refreshUserContext();
        self.gateBtnText = "Otwórz bramę!";

        self.login = function (email, password) {
            $cordovaToast
                .showLongBottom('Here is a message', 'long', 'center', function(a) { console.log('toast success: ' + a) }, function(b) { alert('toast error: ' + b) });

            //self.globalLoadingOn();
            //self.clearNotifications();
            //apiFactory.post(apiFactory.apiEnum.Login, { UserName: email, Password: password }).then(function (data) {
            //    self.globalLoadingOff();
            //    if (data.IsValid === true) {
            //        accountService.login(data.Result.PasswordHash, email, data.Result.Charges, data.Result.Name);
            //        self.refreshUserContext();
            //        console.log("Logged in");
            //    } else {
            //        self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
            //        console.log(data.ValidationErrors);
            //    }
            //}, function () {
            //    self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
            //    self.globalLoadingOff();
            //    console.log(CONFIG.ConnectivityProblemMessage);
            //});
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

    angular.module('content-homepage').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout', '$controller', '$scope', 'CONFIG', '$cordovaToast', homepageController]);
})();


