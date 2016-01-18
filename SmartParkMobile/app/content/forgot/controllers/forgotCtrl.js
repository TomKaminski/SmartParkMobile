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


