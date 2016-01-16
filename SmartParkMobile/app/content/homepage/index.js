var homepage = angular.module('content-homepage', ['appTemplates', 'ionic']);

homepage.stateConfig = {
    templateProvider: [
        '$templateCache',
        function ($templateCache) {
            return $templateCache.get('app/content/homepage/templates/index.html');
        }
    ],
    controller: 'homepageCtrl',
    controllerAs: 'homepageCtrl'
};
