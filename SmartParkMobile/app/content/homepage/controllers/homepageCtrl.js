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


