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


