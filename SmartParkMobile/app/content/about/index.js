(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/about/templates/index.html');
                }
            ],
            controller: 'aboutCtrl',
            controllerAs: 'about'
        };
    }

    angular.module('content-about', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();



