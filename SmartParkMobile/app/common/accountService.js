(function () {
    'use strict';

    function accountService(localStorageFactory) {

        var loggedIn;
        var userCharges;
        var userEmail;
        var memoryHash;

        this.updateCharges = function() {
            userCharges = localStorageFactory.get('charges');
        };

        this.login = function(hash, email, charges) {
            localStorageFactory.set('email', email);
            localStorageFactory.set('hash', hash);
            localStorageFactory.set('charges', charges);
            loggedIn = true;
            userCharges = charges;
            userEmail = email;
            memoryHash = hash;
        };

        this.getAccountData = function() {
            return {
                loggedIn,
                userCharges,
                userEmail,
                memoryHash
            };
        };

        this.checkIfLogged = function() {
            memoryHash = localStorageFactory.get('hash');
            if (memoryHash === null) {
                return false;
            } else {
                userEmail = localStorageFactory.get('email');
                userCharges = localStorageFactory.get('charges');
                loggedIn = true;
                return true;
            }
        };

        this.fastCheckIfLogged = function() {
            return loggedIn;
        };

        this.logout = function() {
            loggedIn = false;
            userCharges = null;
            userEmail = null;
            memoryHash = null;
            localStorageFactory.clear();
        };
    }
    angular.module('app').service('accountService', accountService);
})();