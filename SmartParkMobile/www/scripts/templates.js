(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/homepage/templates/index.html",
    "<ion-view title=\"TEST\"><ion-content padding=\"true\">homepage<br>{{ homepageCtrl.model.message }}<br>{{ homepageCtrl.zmienna }}</ion-content></ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/layout/templates/index.html",
    "<ion-side-menus><ion-side-menu-content><ion-nav-bar class=\"bar-dark\"><ion-nav-buttons side=\"left\"><button class=\"button button-icon button-clear ion-navicon\" ng-click=\"layoutCtrl.toggleLeft()\"></button></ion-nav-buttons></ion-nav-bar><ion-nav-view name=\"content\"></ion-nav-view></ion-side-menu-content><ion-side-menu side=\"left\"><ion-header-bar class=\"bar-assertive\"><h1 class=\"title\">Left Menu</h1></ion-header-bar><ion-content><div class=\"list\"><div class=\"item\">Item1 test</div><div class=\"item\">Item2 test</div><div class=\"item\">Item3 test</div><div class=\"item\">Item4 test</div><div class=\"item\">Item5 test</div><div class=\"item\">Item6 test</div></div></ion-content></ion-side-menu></ion-side-menus>");
}]);
})();
