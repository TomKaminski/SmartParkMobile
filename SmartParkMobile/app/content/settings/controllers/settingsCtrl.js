(function () {
    'use strict';

    function settingsController(accountService, apiFactory, $controller, $scope, CONFIG) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));

        var self = this;

        self.changePassword = function (code, newCode) {
            self.clearNotifications();
            self.globalLoadingOn();
            self.refreshUserContext();

            apiFactory.post(apiFactory.apiEnum.ChangePassword, { Email: self.user.userEmail, Code: code, NewCode: newCode }).then(function (data) {
                self.globalLoadingOff();
                if (data.IsValid) {
                    self.pushToNotifications({ value: "Hasło zostało zmienione, zaloguj się do aplikacji używając nowego hasła.", type: CONFIG.notificationEnum.success });
                    accountService.logout();
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                }
              }, function () {
                self.globalLoadingOff();
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
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                }
            }, function () {
                self.globalLoadingOff();
                self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
            });
        };

    }

    angular.module('content-settings').controller('settingsCtrl', ['accountService', 'apiFactory', '$timeout', '$controller','$scope','CONFIG', settingsController]);
})();


