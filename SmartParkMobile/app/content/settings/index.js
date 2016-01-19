(function() {
    'use strict';

    function stateConfig() {
        return {
            templateProvider: [
                '$templateCache',
                function ($templateCache) {
                    return $templateCache.get('app/content/settings/templates/settings.html');
                }
            ],
            controller: 'settingsCtrl',
            controllerAs: 'settings'
        };
    }

    angular.module('content-settings', ['appTemplates', 'ionic']).stateConfig = stateConfig();
})();



