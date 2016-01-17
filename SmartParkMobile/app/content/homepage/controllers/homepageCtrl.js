(function () {
    'use strict';

    function homepageController(accountService, apiFactory, $timeout) {

        var self = this;
        refreshUserContext();
        self.countText = "Otwórz bramę!";

        //self.init = function () {
        //    debugger;
        //    refreshUserContext();
        //}

        self.login = function (email, password) {
            self.processing = true;
            self.loginError = "";

            apiFactory.post(apiFactory.apiEnum.login, { UserName: email, Password: password }).then(function (data) {
                self.processing = false;
                if (data.IsValid === true) {
                    accountService.login(data.Result.PasswordHash, email, data.Result.Charges);
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

        //var i = 5;
        //function removeDisabled() {
        //    if (i !== 0) {
        //        $timeout(function () {
        //            i--;
        //            self.countText = i + "...";
        //            removeDisabled();
        //        }, 1000);
        //    }
        //    if (i === 0) {
        //        self.turnOff = false;
        //        self.countText = "Otwórz bramę!";
        //        i = 5;
        //    }
        //}

        //self.GetStudentDataWithHeader = function(userName) {
        //    apiFactory.post(apiFactory.apiEnum.GetStudentDataWithHeader, { userName: userName }).then(function (data) {
        //        console.log(data);
        //        if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
        //            accountService.login(data.PasswordHash, userName, data.Result.Charges);
        //        }
        //    }, function (err) {
        //        console.log(err);
        //    });
        //};

        //self.GetStudentDataWithoutHeader = function (userName) {
        //    apiFactory.post(apiFactory.apiEnum.GetStudentDataWithoutHeader, { userName: userName }).then(function (data) {
        //        console.log(data);
        //        if (data.Result.PasswordHash != null && data.Result.PasswordHash.length !== 0) {
        //            accountService.login(data.Result.PasswordHash, userName, data.Result.Charges);
        //        }
        //    }, function (err) {
        //        console.log(err);
        //    });
        //};

        //self.CheckUserHeader = function (userName) {
        //    apiFactory.post(apiFactory.apiEnum.CheckUserHeader, { userName: userName }).then(function (data) {
        //        console.log(data);
        //    }, function (err) {
        //        console.log(err);
        //    });
        //};
    }

    angular.module('content-homepage').controller('homepageCtrl', ['accountService', 'apiFactory', '$timeout', homepageController]);
})();


