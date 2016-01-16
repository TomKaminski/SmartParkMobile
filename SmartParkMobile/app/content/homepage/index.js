(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/homepage/templates/index.html');
                }
            ],
            controller: 'homepageCtrl',
            controllerAs: 'homepageCtrl'
        };
    }

    angular.module('content-homepage', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();



