(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/about/templates/index.html",
    "<ion-view title=\"SmartPark - O aplikacji\"><ion-content has-bouncing=\"false\" overflow-scroll=\"false\"><div class=\"col-80 col-offset-10 margin-top-20\"><img src=\"../img/logo.png\"></div><div class=\"margin-top-20\"><p>Projekt zrealizowany w ramach pracy dyplomowej o temacie: \"System parkingowy ATH\". W skład projektu wchodzi:<br>1. Aplikacja mobilna<br>2. Panel zakupowy<br>3. System dokonywania płatności</p><h3>Autor: inż. Tomasz Kamiński</h3><h4>Promotor: dr inż. Szymon Tengler</h4><h4>Projekt graficzny: inż. Katarzyna Jasiewicz</h4></div></ion-content></ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/forgot/templates/forgot.html",
    "<ion-view title=\"SmartPark - Zapomniane hasło\"><ion-content has-bouncing=\"false\" overflow-scroll=\"false\"><div class=\"col-80 col-offset-10 margin-top-20\"><img src=\"../img/logo.png\"></div><div class=\"margin-top-20\"><div class=\"padding\"><p>Jeżeli zapomniałeś hasła do swojego konta lub z jakiegoś powodu je straciłeś, to jest to odpowiednie miejsce.</p><p>Aby zmienić hasło wpisz poniżej adres email, który podawałeś przy rejestracji w systemie Parking ATH.</p><p>Na podany adres email zostanie wysłana wiadomość z dalszymi instrukcjami.</p></div><div class=\"list\" ng-form=\"\" name=\"form\"><label class=\"item item-input item-floating-label\" ng-class=\"{'has-error':form.email.$invalid && form.email.$touched}\"><span class=\"input-label\">Adres email</span> <input type=\"email\" placeholder=\"Email\" ng-model=\"email\" required=\"\" name=\"email\" id=\"email\"> <span class=\"form-error\" ng-show=\"form.email.$error.required && form.email.$touched\">Podaj adres email!</span> <span class=\"form-error\" ng-show=\"form.email.$error.email && form.email.$touched\">To nie jest prawidłowy adres email!</span></label></div><button class=\"button button-full button-positive\" ng-click=\"forgot.forgotPassword(email)\" ng-class=\"{'disabled':form.$invalid}\">Potwierdź</button></div></ion-content></ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/homepage/templates/index.html",
    "<ion-view title=\"SmartPark - Home\"><ion-content has-bouncing=\"false\" overflow-scroll=\"false\"><div class=\"col-80 col-offset-10 margin-top-20\"><img src=\"../img/logo.png\"></div><div class=\"margin-top-20\"><div ng-if=\"home.user.loggedIn===true\"><p class=\"light padding\" id=\"zalogujText\">Zalogowany jako:</p><h3 class=\"light padding\" id=\"emailText\">{{home.user.email}}</h3><hr><h4 class=\"text-center\" id=\"charges\">Ilość wyjazdów: {{home.user.charges}}</h4><button class=\"button button-full button-balanced no-padding fixedHeight\" ng-class=\"{'disabled':home.globalLoading}\" ng-click=\"home.refresh()\">Odśwież wyjazdy</button> <button id=\"openGates\" class=\"button button-full button-royal button-large\" ng-click=\"home.openGates()\" ng-model=\"home.countText\" ng-class=\"{'disabled':!home.isGateBtnActive || home.charges == 0}\">{{home.gateBtnText}}</button></div><div ng-if=\"home.user.loggedIn === false\"><p class=\"light padding\" id=\"zalogujText\">Zaloguj się do aplikacji:</p><div class=\"list\" ng-form=\"\" name=\"form\"><label class=\"item item-input item-floating-label\" ng-class=\"{'has-error':form.email.$invalid && form.email.$touched}\"><span class=\"input-label\">Adres email</span> <input type=\"email\" placeholder=\"Email\" ng-model=\"email\" required=\"\" name=\"email\" id=\"email\" style=\"width:100vw\"> <span class=\"form-error\" ng-show=\"form.email.$error.required && form.email.$touched\">Podaj adres email!</span> <span class=\"form-error\" ng-show=\"form.email.$error.email && form.email.$touched\">To nie jest prawidłowy adres email!</span></label> <label class=\"item item-input item-floating-label\" id=\"passLabel\" ng-class=\"{'has-error':form.password.$invalid && form.password.$touched}\"><span class=\"input-label\">Hasło</span> <input type=\"password\" placeholder=\"Hasło\" required=\"\" name=\"password\" ng-model=\"password\" id=\"password\" ng-minlength=\"8\"> <span class=\"form-error\" ng-show=\"form.password.$error.required && form.password.$touched\">Podaj hasło!</span> <span class=\"form-error\" ng-show=\"(form.password.$error.minlength) && form.password.$touched\">Hasło musi mieć minimum 8 znaków!</span></label></div><button class=\"button button-full button-positive\" ng-class=\"{'disabled':form.$invalid || home.globalLoading==true}\" ng-click=\"home.login(email,password)\">Zaloguj</button></div></div></ion-content></ion-view>");
}]);
})();

(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/layout/templates/index.html",
    "<ion-side-menus><ion-side-menu-content><ion-footer-bar class=\"bar-smart-blue\"><div class=\"buttons\"><h1 class=\"title\"><img src=\"../img/swipe-icon.png\">PRZESUŃ, BY WYŚWIETLIC MENU</h1><button class=\"button button-icon button-clear ion-navicon\" ng-click=\"layout.toggleLeft()\"></button></div></ion-footer-bar><ion-nav-view name=\"content\"></ion-nav-view></ion-side-menu-content><ion-side-menu side=\"left\" class=\"side-menu-smart-blue\"><ion-content overflow-scroll=\"false\" has-bouncing=\"false\"><div class=\"row side-menu-logo\"><div class=\"col col-67\"><img src=\"../img/logo_white.png\"></div><div class=\"col col-33 menu-text\">MENU</div></div><div class=\"list\" id=\"layoutList\"><div ng-if=\"layout.getUserContext().loggedIn===true\"><div class=\"item\" style=\"text-transform: none\"><b>Witaj, {{layout.getUserContext().userName}}</b><div class=\"border-bottom-fixed\"></div></div><div class=\"item\" ng-click=\"layout.goTo('app.homepage')\"><i class=\"icon ion-ios-home-outline\"></i>Home<div class=\"border-bottom-fixed\"></div></div><div class=\"item\" ng-click=\"layout.goTo('app.settings')\"><i class=\"icon ion-ios-gear-outline\"></i>Ustawienia<div class=\"border-bottom-fixed\"></div></div><div class=\"item\" ng-click=\"layout.logout()\"><i class=\"icon ion-android-exit\"></i>Wyloguj<div class=\"border-bottom-fixed\"></div></div></div><div ng-if=\"layout.getUserContext().loggedIn===false\"><div class=\"item\" ng-click=\"layout.goTo('app.homepage')\"><i class=\"icon ion-ios-home-outline\"></i>Home<div class=\"border-bottom-fixed\"></div></div><div class=\"item\" ng-click=\"layout.goTo('app.forgot')\"><i class=\"icon ion-ios-unlocked-outline\"></i> Zapomniane hasło<div class=\"border-bottom-fixed\"></div></div></div><div class=\"item\" ng-click=\"layout.goTo('app.about')\"><img src=\"../img/smartpark-mini.png\" style=\"margin-left: 7px;\">O aplikacji<div class=\"border-bottom-fixed\"></div></div><div class=\"item\"><img src=\"../img/swipe-icon-left.png\"> Przesuń, aby zwinąć<div class=\"border-bottom-fixed\"></div></div></div><div class=\"sidenav-copyright\"><span class=\"copyright-sign\">&copy;</span><br>copyright smartPARK</div></ion-content></ion-side-menu></ion-side-menus>");
}]);
})();

(function(module) {
try { module = angular.module("appTemplates"); }
catch(err) { module = angular.module("appTemplates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("app/content/settings/templates/settings.html",
    "<ion-view title=\"SmartPark - Ustawienia\"><ion-content has-bouncing=\"false\" overflow-scroll=\"false\"><div class=\"col-80 col-offset-10 margin-top-20\"><img src=\"../img/logo.png\"></div><div class=\"margin-top-20\"><h4 class=\"no-padding-border\">Zmiana hasła</h4><div class=\"list\" ng-form=\"\" name=\"passwordForm\"><label class=\"item item-input item-floating-label\" ng-class=\"{'has-error':passwordForm.newPassword.$invalid && passwordForm.newPassword.$touched}\"><span class=\"input-label\">Nowe hasło</span> <input type=\"password\" placeholder=\"Nowe hasło\" ng-model=\"newPassword\" required=\"\" name=\"newPassword\" id=\"newPassword\"> <span class=\"form-error\" ng-show=\"passwordForm.newPassword.$error.required && passwordForm.newPassword.$touched\">Podaj nowe hasło.</span> <span class=\"form-error\" ng-show=\"(passwordForm.newPassword.$error.minlength) && passwordForm.newPassword.$touched\">Hasło musi mieć minimum 8 znaków!</span></label> <label class=\"item item-input item-floating-label\" id=\"passwordLabel\" ng-class=\"{'has-error':passwordForm.password.$invalid && passwordForm.password.$touched}\"><span class=\"input-label\">Obecne hasło</span> <input type=\"password\" placeholder=\"Obecne hasło\" required=\"\" name=\"password\" ng-model=\"password\" id=\"password\" ng-minlength=\"8\"> <span class=\"form-error\" ng-show=\"passwordForm.password.$error.required && passwordForm.password.$touched\">Podaj hasło!</span> <span class=\"form-error\" ng-show=\"(passwordForm.password.$error.minlength) && passwordForm.password.$touched\">Hasło musi mieć minimum 8 znaków!</span></label></div><div class=\"row no-padding\"><button class=\"button button-full button-positive\" ng-class=\"{'disabled': settings.globalLoading==true || passwordForm.$invalid}\" ng-click=\"settings.changePassword(password,newPassword)\">Zmień hasło</button></div></div><div class=\"margin-top-20\"><h4 class=\"no-padding-border\">Zmiana emaila</h4><div class=\"list\" ng-form=\"\" name=\"formEmail\"><label class=\"item item-input item-floating-label\" ng-class=\"{'has-error':formEmail.email.$invalid && formEmail.email.$touched}\"><span class=\"input-label\">Nowy adres email</span> <input type=\"email\" placeholder=\"Nowy adres email\" ng-model=\"email\" required=\"\" name=\"email\" id=\"email\"> <span class=\"form-error\" ng-show=\"formEmail.email.$error.required && formEmail.email.$touched\">Podaj nowy adres email!</span> <span class=\"form-error\" ng-show=\"formEmail.email.$error.email && formEmail.email.$touched\">To nie jest prawidłowy adres email!</span></label> <label class=\"item item-input item-floating-label\" id=\"passLabel\" ng-class=\"{'has-error':formEmail.pass.$invalid && formEmail.pass.$touched}\"><span class=\"input-label\">Hasło</span> <input type=\"password\" placeholder=\"Hasło\" required=\"\" name=\"pass\" ng-model=\"pass\" id=\"pass\" ng-minlength=\"8\"> <span class=\"form-error\" ng-show=\"formEmail.pass.$error.required && formEmail.pass.$touched\">Podaj hasło!</span> <span class=\"form-error\" ng-show=\"(formEmail.pass.$error.minlength) && formEmail.pass.$touched\">Hasło musi mieć minimum 8 znaków!</span></label></div><p class=\"text-center\" ng-show=\"settings.errorEmail!=''\">{{settings.errorEmail}}</p><button class=\"button button-full button-positive\" ng-click=\"settings.changeEmail(email,pass)\" ng-show=\"!formEmail.$invalid\" ng-class=\"{'disabled':formEmail.$invalid || settings.globalLoading==true}\">Zmień email</button></div></ion-content></ion-view>");
}]);
})();
