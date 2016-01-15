(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/homepage/templates/index.html",
    "homepage<br>{{ homepageCtrl.model.message }}<br>{{ homepageCtrl.zmienna }}");
}]);
})();

(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/not-found/templates/index.html",
    "not-found");
}]);
})();
