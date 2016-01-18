﻿(function () {
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
                } else {
                    self.pushManyToNotifications(data.ValidationErrors, CONFIG.notificationEnum.error);
                }
            }, function () {
                self.pushToNotifications({ value: CONFIG.ConnectivityProblemMessage, type: CONFIG.notificationEnum.error });
                self.globalLoadingOff();
            });
        }
    }

    angular.module('content-forgot').controller('forgotCtrl', ['accountService', 'apiFactory', '$controller', '$scope', 'CONFIG', forgotController]);
})();


