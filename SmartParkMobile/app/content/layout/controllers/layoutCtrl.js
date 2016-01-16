(function () {
    'use strict';

    function layoutController($ionicSideMenuDelegate) {
        var self = this;

        self.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }

    angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate', layoutController]);
})();