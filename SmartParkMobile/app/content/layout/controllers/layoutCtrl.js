angular.module('content-layout').controller('layoutCtrl', ['$ionicSideMenuDelegate',
    function ($ionicSideMenuDelegate) {
        var self = this;

        self.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    }
]);