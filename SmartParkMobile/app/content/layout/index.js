(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/layout/templates/index.html');
                }
            ],
            controller: 'layoutCtrl',
            controllerAs: 'layout'
        };
    }

    angular.module('content-layout', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();

