var notFound = angular.module('content-layout', ['appTemplates', 'ionic']);

notFound.stateConfig = {
    templateProvider: [
        '$templateCache',
        function ($templateCache) {
            return $templateCache.get('app/content/layout/templates/index.html');
        }
    ],
    controller: 'layoutCtrl',
    controllerAs: 'layoutCtrl'
};
