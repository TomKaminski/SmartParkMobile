var notFound = angular.module('content-not-found', []);

notFound.stateConfig = {
    templateProvider: [
        '$templateCache',
        function ($templateCache) {
            return $templateCache.get('app/content/not-found/templates/index.html');
        }
    ]
};
