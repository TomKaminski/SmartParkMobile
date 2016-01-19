(function () {
    'use strict';

    function layoutController($ionicSideMenuDelegate, accountService, $state, $controller, $scope) {
        angular.extend(this, $controller('baseCtrl', { $scope: $scope }));
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
            $state.go('app.homepage');
            console.log("loggedOut");
        }

        self.goTo = function (state) {
            $state.go(state);
            $ionicSideMenuDelegate.toggleLeft();
        }
    }

    angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate', 'accountService', '$state','$controller','$scope', layoutController]);
})();