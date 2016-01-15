angular.module('content-homepage').controller('homepageCtrl', [
    '$window',
    function (
        $window
    ) {

        var self = this;

        self.model = {
            message: "wiadomość"
        };

        self.show = show;

        function show() {

        }

        if (!!$window.cordova) {
            console.log(navigator.camera);
        }
    }
]);
