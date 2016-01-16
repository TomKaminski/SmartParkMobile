(function () {
    'use strict';

    function homepageController(accountService, apiFactory) {

        var self = this;

        self.GetStudentDataWithHeader = function(userName) {
            apiFactory.post(apiFactory.apiEnum.GetStudentDataWithHeader, { userName: userName }).then(function (data) {
                console.log(data);
                debugger;
                if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
                    accountService.login(data.PasswordHash, userName, data.Result.Charges);
                }
            }, function (err) {
                console.log(err);
            });
        };

        self.GetStudentDataWithoutHeader = function (userName) {
            apiFactory.post(apiFactory.apiEnum.GetStudentDataWithoutHeader, { userName: userName }).then(function (data) {
                console.log(data);
                debugger;
                if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
                    accountService.login(data.Result.PasswordHash, userName, data.Result.Charges);
                }
            }, function (err) {
                console.log(err);
            });
        };

        self.CheckUserHeader = function (userName) {
            apiFactory.post(apiFactory.apiEnum.CheckUserHeader, { userName: userName }).then(function (data) {
                debugger;
                console.log(data);
            }, function (err) {
                console.log(err);
            });
        };
    }

    angular.module('content-homepage').controller('homepageCtrl', homepageController);
})();


