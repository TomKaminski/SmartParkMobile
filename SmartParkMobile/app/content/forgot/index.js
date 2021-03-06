(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/forgot/templates/forgot.html');
                }
            ],
            controller: 'forgotCtrl',
            controllerAs: 'forgot'
        };
    }

    angular.module('content-forgot', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();



