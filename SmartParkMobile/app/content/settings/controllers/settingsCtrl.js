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


