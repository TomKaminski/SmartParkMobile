(function () {
    'use strict';

    function layoutController($ionicSideMenuDelegate, accountService, $state) {
        var self = this;

        self.getUserContext = function() {
            return accountService.initUserContext();
        }

        self.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        self.logout = function () {
            $ionicSideMenuDelegate.toggleLeft();
            accountService.logout();
            accountService.initUserContext();
        }

        self.goTo = function (state) {
            $state.go(state);
            $ionicSideMenuDelegate.toggleLeft();
        }
    }

    angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate', 'accountService', '$state', layoutController]);
})();